import axios from 'axios';
import { ENV } from '@shared/constants/env';
import { logger } from '@shared/utils/logger';

const render = axios.create({
  baseURL: 'https://api.render.com/v1',
  headers: {
    Authorization: `Bearer ${ENV.RENDER_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const deployToRender = async (
  projectId: string,
  repoUrl: string
): Promise<string> => {

  const serviceName = `craftly-${projectId}-backend`;

  // 1. Create a Render web service
  const { data } = await render.post('/services', {
    type: 'web_service',
    name: serviceName,
    repo: repoUrl,
    branch: 'master',
    rootDir: 'backend',
    buildCommand: 'npm install && npm run build',
    startCommand: 'npm start',
    plan: 'free',
    region: 'oregon',
    envVars: [],
  });

  const serviceId = data.service?.id;
  if (!serviceId) throw new Error('Render service creation failed');

  // 2. Poll until deploy is live (max 5 minutes)
  let url = '';
  const maxAttempts = 60;

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(res => setTimeout(res, 5000));
    const { data: service } = await render.get(`/services/${serviceId}`);

    if (service.service?.serviceDetails?.url) {
      url = service.service.serviceDetails.url;
      break;
    }
  }

  if (!url) throw new Error('Render deployment timed out');

  logger.info(`✅ Render deployment live: ${url}`);
  return url;
};
