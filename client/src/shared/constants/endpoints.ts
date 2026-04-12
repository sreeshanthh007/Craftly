export const SANDBOX_START = '/api/sandbox/start'
export const SANDBOX_STOP = '/api/sandbox/stop'

export const ENDPOINTS = {
  chat: {
    send: (projectId: string) => `/api/chat/${projectId}`,
    history: (projectId: string) => `/api/chat/${projectId}/history`,
    files: (projectId: string) => `/api/chat/${projectId}/files`,
  },
  sandbox: {
    start: (projectId: string) => `/api/sandbox/start/${projectId}`,
    stop: (containerId: string) => `/api/sandbox/stop/${containerId}`,
  },
  deploy: {
    trigger: (projectId: string) => `/api/deploy/${projectId}`,
  },
  projects: {
    list: () => `/api/projects`,
    get: (projectId: string) => `/api/projects/${projectId}`,
    create: () => `/api/projects`,
  },
} as const
