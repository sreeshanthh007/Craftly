import { Request, Response } from 'express'
import { processUserMessage } from './chatService'
import {  getSupabaseClient } from '../../shared/utils/supabase'
import { STATUS_CODES } from '../../shared/constants/statusCodes'
import { ERROR_MESSAGES } from '../../shared/constants/messages'

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
    const { projectId } = req.params

    if (!projectId) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: ERROR_MESSAGES.PROJECT_ID_REQUIRED })
      return
    }

    const token = req.token
    const client = getSupabaseClient(token)
    const { data, error } = await client
      .from('messages')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true })

    if (error) throw new Error(error.message)

    res.status(STATUS_CODES.OK).json({ success: true, messages: data ?? [] })

  } catch (error) {
    console.error('Get history error:', error)
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: (error as Error).message })
  }
}
