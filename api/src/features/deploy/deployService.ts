import { pushToGitHub } from './githubService';
import { deployToVercel } from './vercelService';
import { deployToRender } from './renderService';
import { supabase } from '@shared/utils/supabase';
import type { DeployResult } from '@shared/types/types';
import { logger } from '@shared/utils/logger';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@shared/constants/messages';

export const deployProject = async (projectId: string): Promise<DeployResult> => {

  logger.info(`🚀 Starting deployment for project ${projectId}...`);

  // 1. Push to GitHub
  const repoName = `craftly-${projectId}`;
  const repoUrl = await pushToGitHub(projectId);

  // 2. Deploy frontend to Vercel + backend to Render in parallel
  const [frontendUrl, backendUrl] = await Promise.all([
    deployToVercel(projectId, repoName),
    deployToRender(projectId, repoUrl),
  ]);

  // 3. Save to Supabase
  const result: DeployResult = {
    projectId,
    repoUrl,
    frontendUrl,
    backendUrl,
    provider: { frontend: 'vercel', backend: 'render' },
    createdAt: new Date().toISOString(),
  };

  const { error } = await supabase.from('deployments').insert({
    project_id: projectId,
    repo_url: repoUrl,
    frontend_url: frontendUrl,
    backend_url: backendUrl,
  });

  if (error) {
    logger.error(`${ERROR_MESSAGES.DEPLOY_SAVE_ERROR}: ${error.message}`);
    throw new Error(`${ERROR_MESSAGES.DEPLOY_SAVE_ERROR}: ${error.message}`);
  }

  logger.info(`${SUCCESS_MESSAGES.DEPLOY_SUCCESS} for project ${projectId}`);
  return result;
};
