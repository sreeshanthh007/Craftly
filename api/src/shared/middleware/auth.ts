import { Request, Response, NextFunction } from 'express'
import { supabase } from '@shared/utils/supabase'
import { STATUS_CODES } from '@shared/constants/statusCodes'
import { ERROR_MESSAGES } from '@shared/constants/messages'

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null

  if (!token) {
    res.status(STATUS_CODES.UNAUTHORIZED).json({ 
      success: false, 
      message: ERROR_MESSAGES.NO_TOKEN 
    })
    return
  }

  try {
    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({ 
        success: false, 
        message: ERROR_MESSAGES.INVALID_TOKEN 
      })
      return
    }

    req.user = data.user
    req.token = token
    next()
  } catch (error) {
    res.status(STATUS_CODES.UNAUTHORIZED).json({ 
      success: false, 
      message: ERROR_MESSAGES.UNAUTHORIZED 
    })
  }
}
