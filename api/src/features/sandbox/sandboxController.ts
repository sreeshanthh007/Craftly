import { Request, Response } from 'express';
import { runInSandbox, stopSandbox } from './sandboxService';

export const startSandbox = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params as { projectId: string };

    const result = await runInSandbox(projectId);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const stopSandboxHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { containerId } = req.params as { containerId: string };
    await stopSandbox(containerId);
    res.json({ success: true, message: 'Sandbox stopped' });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};