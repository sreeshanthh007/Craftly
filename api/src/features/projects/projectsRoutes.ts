import { Router } from 'express'
import { listProjects, getProject, createNewProject } from './projectsController'

const router = Router()

router.get('/', listProjects)
router.get('/:projectId', getProject)
router.post('/', createNewProject)

export default router
