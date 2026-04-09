import { useState, useEffect } from 'react'
import { sendMessage, fetchChatHistory } from '@services/chatService'
import { useToast } from '@/hooks/useToast'
import type { Message, GeneratedFileOutput } from '@shared/types'

export const useChat = (projectId: string) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [files, setFiles] = useState<GeneratedFileOutput[]>([])
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { successToast, errorToast } = useToast()

  useEffect(() => {
    if (!projectId) {
      setMessages([])
      return
    }

    const load = async () => {
      setHistoryLoading(true)
      try {
        const history = await fetchChatHistory(projectId)
        setMessages(history)
      } catch (err: any) {
        errorToast(err?.response?.data?.message || err?.message || 'Failed to communicate with Craftly')
      } finally {
        setHistoryLoading(false)
      }
    }

    load()
  }, [projectId])

  const send = async (content: string) => {
    setLoading(true)
    setError(null)
    const userMessage = { role: 'user', content } as Message
    setMessages(prev => [...prev, userMessage])
    try {
      const res = await sendMessage(projectId, content)
      setMessages(prev => [...prev, { role: 'assistant', content: res.reply } as Message])
      if (res.files && res.files.length > 0) {
        setFiles(res.files)
        successToast('App built successfully!')
      }
    } catch (err: any) {
      setError('Failed to send message')
      errorToast(err?.response?.data?.message || err?.message || 'Failed to communicate with Craftly')
    } finally {
      setLoading(false)
    }
  }

  return { messages, files, loading, historyLoading, error, send }
}
