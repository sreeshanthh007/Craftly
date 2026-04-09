import { apiClient } from '@lib/apiClient'
import { ENDPOINTS } from '@shared/constants/endpoints'
import type { ChatResponse } from '@shared/types'

export const sendMessage = async (
  projectId: string,
  message: string
): Promise<ChatResponse> => {
  const { data } = await apiClient.post(ENDPOINTS.chat.send(projectId), { message })
  return data
}

export const fetchChatHistory = async (projectId: string) => {
  const { data } = await apiClient.get(ENDPOINTS.chat.history(projectId))
  return data.messages
}
