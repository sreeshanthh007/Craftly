import { Request, Response, NextFunction } from 'express'
import { supabase } from '../utils/supabase'

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null

  if (!token) {
    res.status(401).json({ 
      success: false, 
      message: 'Unauthorized: No token provided' 
    })
    return
  }

  try {
    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      res.status(401).json({ 
        success: false, 
        message: 'Unauthorized: Invalid token' 
      })
      return
    }

    req.user = data.user
    req.token = token
    next()
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Unauthorized: Authentication failed' 
    })
  }
}
