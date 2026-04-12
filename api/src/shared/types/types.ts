
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

export interface PlannerOutput {
  projectName: string;
  description: string;
  features: string[];
  filesToCreate: {
    ui: string[];
    backend: string[];
    devops: string[];
  };
  tasks: {
    ui: string;
    backend: string;
    devops: string;
  };
}

export interface GeneratedFileOutput {
  path: string;
  content: string;
  language: string;
}

export interface Message {
  id: string;
  project_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  agent_type: 'planner' | 'ui' | 'backend' | 'devops' | 'orchestrator' | null;
  created_at: string;
}

export interface AgentFilesOutput {
  files: GeneratedFileOutput[];
}

export interface OrchestratorResult {
  plan: PlannerOutput;
  files: GeneratedFileOutput[];
}

export interface SandboxResult {
  previewUrl: string;
  containerId: string;
  port: number;
}

export type SandboxStatus = 'idle' | 'starting' | 'running' | 'error' | 'stopped';

export interface DeployResult {
  projectId: string;
  repoUrl: string;
  frontendUrl: string;
  backendUrl: string;
  provider: {
    frontend: 'vercel';
    backend: 'render';
  };
  createdAt: string;
}

export interface ChatResponse {
  reply: string;
  files?: GeneratedFileOutput[];
}