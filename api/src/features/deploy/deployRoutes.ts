import { Router } from 'express';
import { triggerDeploy } from './deployController';

const router = Router();

router.post('/:projectId', triggerDeploy);

export default router;
