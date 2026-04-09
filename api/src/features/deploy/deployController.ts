import { Request, Response } from 'express';
import { deployProject } from './deployService';
import { logger } from '@shared/utils/logger';
import { ERROR_MESSAGES } from '@shared/constants/messages';
import { STATUS_CODES } from '@shared/constants/statusCodes';

export const triggerDeploy = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: ERROR_MESSAGES.PROJECT_ID_REQUIRED });
      return;
    }

    const result = await deployProject(projectId as string);
    res.status(STATUS_CODES.OK).json({ success: true, ...result });

  } catch (error) {
    logger.error('Deploy error:', error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: (error as Error).message });
  }
};
