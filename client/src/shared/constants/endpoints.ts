export const ENDPOINTS = {
  chat: {
    send: (projectId: string) => `/api/chat/${projectId}`,
  },
  sandbox: {
    start: (projectId: string) => `/api/sandbox/start/${projectId}`,
    stop: (containerId: string) => `/api/sandbox/stop/${containerId}`,
  },
  deploy: {
    trigger: (projectId: string) => `/api/deploy/${projectId}`,
  },
} as const
