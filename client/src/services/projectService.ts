import { apiClient } from '@/lib/apiClient'
import { ENDPOINTS } from '@shared/constants/endpoints'
import type { Project } from '@shared/types'

export const fetchProjects = async (): Promise<Project[]> => {
  const { data } = await apiClient.get(ENDPOINTS.projects.list())
  return data.projects
}

export const createProject = async (
  name: string,
  description?: string
): Promise<Project> => {
  const { data } = await apiClient.post(ENDPOINTS.projects.create(), { name, description })
  return data.project
}
