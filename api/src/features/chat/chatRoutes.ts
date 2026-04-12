import { Router } from 'express'
import { sendMessage, getHistory, getFiles } from './chatController'

const router = Router()

router.post('/:projectId', sendMessage)
router.get('/:projectId/history', getHistory)
router.get('/:projectId/files', getFiles)

export default router
