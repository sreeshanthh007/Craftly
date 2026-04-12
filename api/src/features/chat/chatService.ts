import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import { ENV } from "@shared/constants/env";
import { supabase, getSupabaseClient } from "@shared/utils/supabase";
import { SYSTEM_PROMPT } from "@shared/constants/constants";
import { orchestrate } from "@agents/orchestrator";
import { saveFilesToSupabase } from "@features/codegen/codegenService";
import { saveFilesToDisk } from "@features/codegen/gitService";
import type { Message, GeneratedFileOutput, ChatResponse } from "@shared/types/types";

const model = new ChatGoogleGenerativeAI({
  apiKey: ENV.GEMINI_API_KEY,
  model: "gemini-2.0-flash",
  temperature: 0.7,
});


const saveMessage = async (
  projectId: string,
  role: 'user' | 'assistant',
  content: string,
  token?: string,
  agentType?: Message['agent_type']
): Promise<void> => {
  const client = getSupabaseClient(token);
  const { error } = await client.from('messages').insert({
    project_id: projectId,
    role,
    content,
    agent_type: agentType ?? null,
  });

  if (error) throw new Error(`Failed to save message: ${error.message}`);
};

// ── Fetch history from Supabase ─────────────────────────────
const getHistory = async (projectId: string, token?: string): Promise<Message[]> => {
  const client = getSupabaseClient(token);
  const { data, error } = await client
    .from('messages')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true })
    .limit(10);

  if (error) throw new Error(`Failed to fetch history: ${error.message}`);
  return data ?? [];
};

export const fetchHistory = async (projectId: string, token?: string): Promise<Message[]> => {
  const client = getSupabaseClient(token);
  const { data, error } = await client
    .from('messages')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(`Failed to fetch history: ${error.message}`);
  return data ?? [];
};



export const processUserMessage = async (
  projectId: string,
  message: string,
  token?: string
): Promise<ChatResponse> => {

  // 1. Save user message
  await saveMessage(projectId, 'user', message, token);

  // 2. Fetch history
  const history = await getHistory(projectId, token);

  // 3. Build request → trigger orchestrator
  const isBuildRequest = /build|create|make|generate|app|project/i.test(message);

  if (isBuildRequest) {
    const result = await orchestrate(message);
    
    await saveFilesToDisk(projectId, result.files);
    await saveFilesToSupabase(projectId, result.files, token);

    const reply = `✅ Project **${result.plan.projectName}** is ready!\n\n${result.plan.description}\n\nGenerated ${result.files.length} files and committed to Git!`;

    await saveMessage(projectId, 'assistant', reply, token, 'orchestrator');

    return { reply, files: result.files };
  }


  const messages = [
    new SystemMessage(SYSTEM_PROMPT),
    ...history.slice(-10).map(msg =>
      msg.role === 'user'
        ? new HumanMessage(msg.content)
        : new AIMessage(msg.content)
    ),
    new HumanMessage(message),
  ];

  const response = await model.invoke(messages);
  const reply = response.content as string;

  // 5. Save assistant reply
  await saveMessage(projectId, 'assistant', reply, token);

  return { reply };
};