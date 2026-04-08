
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
  containerId: string;
  previewUrl: string;
  port: string;
}