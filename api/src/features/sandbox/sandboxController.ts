import { Request, Response } from 'express';
import { runInSandbox, stopSandbox } from './sandboxService';
import { STATUS_CODES } from '@shared/constants/statusCodes';
import { ERROR_MESSAGES } from '@shared/constants/messages';

export const startSandbox = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params as { projectId: string };

    const result = await runInSandbox(projectId);
    res.status(STATUS_CODES.OK).json({ success: true, ...result });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ 
      success: false, 
      message: (error as Error).message ?? ERROR_MESSAGES.INTERNAL_SERVER_ERROR 
    });
  }
};

export const stopSandboxHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { containerId } = req.params as { containerId: string };
    await stopSandbox(containerId);
    res.status(STATUS_CODES.OK).json({ success: true, message: 'Sandbox stopped' });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ 
      success: false, 
      message: (error as Error).message ?? ERROR_MESSAGES.INTERNAL_SERVER_ERROR 
    });
  }
};