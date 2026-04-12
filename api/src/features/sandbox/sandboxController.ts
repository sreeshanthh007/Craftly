import { Request, Response } from 'express';
import { startSandbox as startSandboxService, stopSandbox as stopSandboxService } from './sandboxService';
import { STATUS_CODES } from '@shared/constants/statusCodes';
import { ERROR_MESSAGES } from '@shared/constants/messages';

export const startSandbox = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.body as { projectId: string };

    if (!projectId) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ 
        success: false, 
        message: 'projectId is required' 
      });
      return;
    }

    const result = await startSandboxService(projectId);
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
    const { projectId } = req.body as { projectId: string };

    if (!projectId) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ 
        success: false, 
        message: 'projectId is required' 
      });
      return;
    }

    await stopSandboxService(projectId);
    res.status(STATUS_CODES.OK).json({ success: true, message: 'Sandbox stopped' });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ 
      success: false, 
      message: (error as Error).message ?? ERROR_MESSAGES.INTERNAL_SERVER_ERROR 
    });
  }
};