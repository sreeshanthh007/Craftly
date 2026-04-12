import { Router } from 'express';
import { startSandbox, stopSandboxHandler } from "./sandboxController"

const router = Router();

router.post('/start', startSandbox);
router.post('/stop', stopSandboxHandler);

export default router;