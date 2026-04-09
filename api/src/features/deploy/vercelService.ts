import axios from 'axios';
import { ENV } from '@shared/constants/env';
import { logger } from '@shared/utils/logger';

const vercel = axios.create({
  baseURL: 'https://api.vercel.com',
  headers: {
    Authorization: `Bearer ${ENV.VERCEL_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const deployToVercel = async (
  projectId: string,
  repoName: string
): Promise<string> => {

  const projectName = `craftly-${projectId}-frontend`;

  // 1. Create Vercel project linked to the GitHub repo
  const { data: project } = await vercel.post('/v9/projects', {
    name: projectName,
    ...(ENV.VERCEL_TEAM_ID ? { teamId: ENV.VERCEL_TEAM_ID } : {}),
    gitRepository: {
      type: 'github',
      repo: `${ENV.GITHUB_USERNAME}/${repoName}`,
    },
    rootDirectory: 'frontend',   // deploy only the frontend subfolder
    framework: 'vite',
  });

  // 2. Trigger a deployment
  const { data: deployment } = await vercel.post('/v13/deployments', {
    name: projectName,
    ...(ENV.VERCEL_TEAM_ID ? { teamId: ENV.VERCEL_TEAM_ID } : {}),
    gitSource: {
      type: 'github',
      repoId: project.link?.repoId,
      ref: 'master',
    },
  });

  // 3. Poll until deployment is ready (max 3 minutes)
  const deploymentId = deployment.id;
  let url = '';
  const maxAttempts = 36;

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(res => setTimeout(res, 5000));
    const { data: status } = await vercel.get(`/v13/deployments/${deploymentId}`);

    if (status.readyState === 'READY') {
      url = `https://${status.url}`;
      break;
    }
    if (status.readyState === 'ERROR') {
      throw new Error(`Vercel deployment failed for project ${projectId}`);
    }
  }

  if (!url) throw new Error('Vercel deployment timed out');

  logger.info(`✅ Vercel deployment live: ${url}`);
  return url;
};
