import { Router } from 'express';
import { startSandbox, stopSandboxHandler } from "./sandboxController"

const router = Router();

router.post('/start/:projectId', startSandbox);
router.post('/stop/:containerId', stopSandboxHandler);

export default router;