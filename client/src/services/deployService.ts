import { apiClient } from '@/lib/apiClient'
import { ENDPOINTS } from '@shared/constants/endpoints'
import type { DeployResult } from '@shared/types/index'

export const deployProject = async (projectId: string): Promise<DeployResult> => {
  const { data } = await apiClient.post(ENDPOINTS.deploy.trigger(projectId))
  return data
}
