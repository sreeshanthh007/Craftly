import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { BACKEND_AGENT_PROMPT } from "@shared/constants/constants";
import { ENV } from "@shared/constants/env";
import { HumanMessage, SystemMessage } from "langchain";


const model = new ChatGoogleGenerativeAI({
    apiKey:ENV.GEMINI_API_KEY,
    model:"gemini-2.5-flash",
    temperature:0.7,
})


export const backendAgent = async (task:string): Promise<string> => {
    
    const messages = [
    new SystemMessage(BACKEND_AGENT_PROMPT),
    new HumanMessage(task),
  ];

    const response = await model.invoke(messages);
    return response.content as string;
}