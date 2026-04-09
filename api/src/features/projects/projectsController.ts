import { Request, Response } from 'express'
import { getAllProjects, getProjectById, createProject } from './projectsService'

export const listProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const token = req.token
    if (!userId) {
      res.status(401).json({ success: false, message: 'User ID missing' })
      return
    }
    const projects = await getAllProjects(userId, token)
    res.json({ success: true, projects })
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message })
  }
}

export const getProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const token = req.token
    const { projectId } = req.params as {projectId: string}
    if (!userId) {
      res.status(401).json({ success: false, message: 'User ID missing' })
      return
    }
    const project = await getProjectById(projectId, userId, token)
    res.json({ success: true, project })
  } catch (error) {
    res.status(404).json({ success: false, message: (error as Error).message })
  }
}

export const createNewProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const token = req.token
    const { name, description } = req.body
    if (!userId) {
      res.status(401).json({ success: false, message: 'User ID missing' })
      return
    }
    if (!name || typeof name !== 'string' || name.trim() === '') {
      res.status(400).json({ success: false, message: 'name is required' })
      return
    }
    const project = await createProject(name, userId, token, description)
    res.status(201).json({ success: true, project })
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message })
  }
}
