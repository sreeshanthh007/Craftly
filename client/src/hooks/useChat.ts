import { useState } from 'react'
import { sendMessage } from '@services/chatService'
import { useToast } from '@/hooks/useToast'
import type { Message, GeneratedFileOutput } from '@shared/types'

export const useChat = (projectId: string) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [files, setFiles] = useState<GeneratedFileOutput[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { successToast, errorToast } = useToast()

  const send = async (content: string) => {
    setLoading(true)
    setError(null)
    setMessages(prev => [...prev, { role: 'user', content }])
    try {
      const res = await sendMessage(projectId, content)
      setMessages(prev => [...prev, { role: 'assistant', content: res.reply }])
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

  return { messages, files, loading, error, send }
}
