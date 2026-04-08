
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import { ENV } from "@shared/constants/env";
import { Message } from "@shared/utils/supabase";
import { SYSTEM_PROMPT } from "@shared/constants/constants";

const model = new ChatGoogleGenerativeAI({
    apiKey : ENV.GEMINI_API_KEY,
    model:"gemini-2.5-flash",
    temperature: 0.7,
})



export const processUserMessage = async (

    message : string,
    history : Message[]
) : Promise<string> =>{

     const messages = [
    new SystemMessage(SYSTEM_PROMPT),
    ...history.slice(-10).map(msg =>
      msg.role === 'user'
        ? new HumanMessage(msg.content)
        : new AIMessage(msg.content)
    ),
    new HumanMessage(message)
  ];

  const response = await model.invoke(messages);
  return response.content as string;
}