import { apiClient } from '@lib/apiClient'
import { SANDBOX_START, SANDBOX_STOP } from '@shared/constants/endpoints'
import type { SandboxResult } from '@shared/types'

export const startSandbox = async (projectId: string): Promise<SandboxResult> => {
  const { data } = await apiClient.post(SANDBOX_START, { projectId })
  return data
}

export const stopSandbox = async (projectId: string): Promise<void> => {
  await apiClient.post(SANDBOX_STOP, { projectId })
}
