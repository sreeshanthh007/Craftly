import { Request, Response } from 'express'
import { processUserMessage, fetchHistory } from './chatService'
import { STATUS_CODES } from '@shared/constants/statusCodes'
import { ERROR_MESSAGES } from '@shared/constants/messages'
import { supabase } from '@shared/utils/supabase'

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params as { projectId: string }
    const { message } = req.body

    if (!projectId) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: ERROR_MESSAGES.PROJECT_ID_REQUIRED })
      return
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: ERROR_MESSAGES.MESSAGE_REQUIRED })
      return
    }

    const token = req.token
    const result = await processUserMessage(projectId, message.trim(), token)

    res.status(STATUS_CODES.OK).json({
      success: true,
      reply: result.reply,
      files: result.files ?? [],
    })

  } catch (error) {
    console.error('Chat controller error:', error)
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: (error as Error).message ?? ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
  }
}

export const getHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params as { projectId: string }

    if (!projectId) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: ERROR_MESSAGES.PROJECT_ID_REQUIRED })
      return
    }

    const token = req.token
    const messages = await fetchHistory(projectId, token)

    res.status(STATUS_CODES.OK).json({ success: true, messages })

  } catch (error) {
    console.error('Get history error:', error)
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ 
      success: false, 
      message: (error as Error).message ?? ERROR_MESSAGES.INTERNAL_SERVER_ERROR 
    })
  }
}


export const getFiles = async (req: Request, res: Response) => {
  const { projectId } = req.params
  const { data, error } = await supabase
    .from('generated_files')
    .select('file_path, content, language')
    .eq('project_id', projectId)
    .order('file_path', { ascending: true })

  if (error) return res.status(500).json({ message: error.message })

  const files = data.map(f => ({
    path: f.file_path,
    content: f.content,
    language: f.language,
  }))

  res.json({ files })
}
