import Docker from 'dockerode';
import path from 'path';
import type { SandboxResult } from '@shared/types/types';
import { logger } from '@shared/utils/logger';

const docker = new Docker();

const PROJECTS_DIR = path.join(process.cwd(), 'generated_projects');

export const runInSandbox = async (projectId: string): Promise<SandboxResult> => {
  const projectDir = path.join(PROJECTS_DIR, projectId);

  logger.info(`🐳 Starting sandbox for project ${projectId}...`);

  const container = await docker.createContainer({
    Image: 'node:20-alpine',
    Cmd: ['sh', '-c', 'npm install && npm run dev'],
    WorkingDir: '/app',
    HostConfig: {
      Binds: [`${projectDir}:/app`],
      PortBindings: {
        '5173/tcp': [{ HostPort: '0' }],
      },
    },
    ExposedPorts: {
      '5173/tcp': {},
    },
  });

  await container.start();

  // Get the assigned port
  const info = await container.inspect();
  const port = info.NetworkSettings.Ports['5173/tcp']?.[0]?.HostPort;

  if (!port) {
    throw new Error('Failed to get sandbox port');
  }

  const previewUrl = `http://localhost:${port}`;
  logger.info(`✅ Sandbox running at ${previewUrl}`);

  return {
    containerId: container.id,
    previewUrl,
    port,
  };
};

export const stopSandbox = async (containerId: string): Promise<void> => {
  const container = docker.getContainer(containerId);
  await container.stop();
  await container.remove();
  logger.info(`🛑 Sandbox ${containerId} stopped and removed`);
};