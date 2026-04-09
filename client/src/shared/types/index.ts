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
  containerId: string
  previewUrl: string
  port: string
}

export interface DeployResult {
  projectId: string
  repoUrl: string
  frontendUrl: string
  backendUrl: string
  provider: { frontend: 'vercel'; backend: 'render' }
  createdAt: string
}
