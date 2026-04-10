import { Request, Response } from 'express'
import { getAllProjects, getProjectById, createProject } from './projectsService'
import { STATUS_CODES } from '@shared/constants/statusCodes'
import { ERROR_MESSAGES } from '@shared/constants/messages'

export const listProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const token = req.token
    if (!userId) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({ success: false, message: ERROR_MESSAGES.USER_ID_MISSING })
      return
    }
    const projects = await getAllProjects(userId, token)
    res.status(STATUS_CODES.OK).json({ success: true, projects })
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ 
      success: false, 
      message: (error as Error).message ?? ERROR_MESSAGES.INTERNAL_SERVER_ERROR 
    })
  }
}

export const getProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const token = req.token
    const { projectId } = req.params as {projectId: string}
    if (!userId) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({ success: false, message: ERROR_MESSAGES.USER_ID_MISSING })
      return
    }
    const project = await getProjectById(projectId, userId, token)
    res.status(STATUS_CODES.OK).json({ success: true, project })
  } catch (error) {
    res.status(STATUS_CODES.NOT_FOUND).json({ success: false, message: (error as Error).message })
  }
}

export const createNewProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const token = req.token
    const { name, description } = req.body
    if (!userId) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({ success: false, message: ERROR_MESSAGES.USER_ID_MISSING })
      return
    }
    if (!name || typeof name !== 'string' || name.trim() === '') {
      res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: ERROR_MESSAGES.NAME_REQUIRED })
      return
    }
    const project = await createProject(name, userId, token, description)
    res.status(STATUS_CODES.CREATED).json({ success: true, project })
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ 
      success: false, 
      message: (error as Error).message ?? ERROR_MESSAGES.INTERNAL_SERVER_ERROR 
    })
  }
}
