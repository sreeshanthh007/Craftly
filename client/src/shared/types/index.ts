export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface GeneratedFileOutput {
  path: string
  content: string
  language: string
}

export interface ChatResponse {
  reply: string
  files?: GeneratedFileOutput[]
}

export interface SandboxResult {
  previewUrl: string;
  containerId: string;
  port: number;
}

export type SandboxStatus = 'idle' | 'starting' | 'running' | 'error' | 'stopped';

export interface DeployResult {
  projectId: string
  repoUrl: string
  frontendUrl: string
  backendUrl: string
  provider: { frontend: 'vercel'; backend: 'render' }
  createdAt: string
}

export interface Project {
  id: string
  user_id: string
  name: string
  description: string | null
  tech_stack: string | null
  repo_url: string | null
  preview_url: string | null
  deploy_url: string | null
  created_at: string
}
