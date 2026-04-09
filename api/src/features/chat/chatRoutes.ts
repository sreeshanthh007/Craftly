import { Router } from 'express'
import { sendMessage, getHistory } from './chatController'

const router = Router()

router.post('/:projectId', sendMessage)
router.get('/:projectId/history', getHistory)

export default router
