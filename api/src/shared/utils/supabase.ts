import { createClient } from '@supabase/supabase-js';
import { ENV } from '@shared/constants/env';

export const supabase = createClient(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_KEY
);

export const getSupabaseClient = (token?: string) => {
  if (!token) return supabase;
  
  return createClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });
};

export interface Message {
  id: string;
  project_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  agent_type: 'planner' | 'ui' | 'backend' | 'devops' | 'orchestrator' | null;
  created_at: string;
}
export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  status: 'draft' | 'building' | 'preview' | 'deployed';
  tech_stack: Record<string, any> | null;
  repo_url: string | null;
  preview_url: string | null;
  deploy_url: string | null;
  created_at: string;
  updated_at: string;
}


export interface GeneratedFile {
  id: string;
  project_id: string;
  file_path: string;
  content: string;
  language: string | null;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface Deployment {
  id: string;
  project_id: string;
  status: 'pending' | 'building' | 'success' | 'failed';
  deploy_url: string | null;
  vercel_deployment_id: string | null;
  logs: string | null;
  created_at: string;
}

export interface AgentTask {
  id: string;
  project_id: string;
  message_id: string | null;
  agent_type: 'planner' | 'ui' | 'backend' | 'devops';
  status: 'pending' | 'running' | 'completed' | 'failed';
  input: Record<string, any> | null;
  output: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}