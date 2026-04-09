import { apiClient } from '@lib/apiClient'
import { ENDPOINTS } from '@shared/constants/endpoints'
import type { SandboxResult } from '@shared/types'

export const startSandbox = async (projectId: string): Promise<SandboxResult> => {
  const { data } = await apiClient.post(ENDPOINTS.sandbox.start(projectId))
  return data
}

export const stopSandbox = async (containerId: string): Promise<void> => {
  await apiClient.post(ENDPOINTS.sandbox.stop(containerId))
}
