import Docker from 'dockerode';
import path from 'path';
import type { SandboxResult } from '@shared/types/types';
import { logger } from '@shared/utils/logger';
import fs from "fs"
const docker = new Docker();

const PROJECTS_DIR = path.join(process.cwd(), 'generated_projects');

const activeSandboxes = new Map<string, SandboxResult>();


const waitForVite = (container: Docker.Container, timeoutMs: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const start = Date.now();

    const poll = async () => {
      if (Date.now() - start > timeoutMs) {
        resolve(false);
        return;
      }
      try {
        const logs = await container.logs({ stdout: true, stderr: true, tail: 20 });
        const text = logs.toString();
        if (text.includes('Local:') || text.includes('ready in') || text.includes('localhost:5173')) {
          resolve(true);
          return;
        }
      } catch {
        // container might not be ready to stream logs yet
      }
      setTimeout(poll, 2000); // check every 2 seconds
    };

    poll();
  });
};

export const startSandbox = async (projectId: string): Promise<SandboxResult> => {
  const projectRoot = path.join(PROJECTS_DIR, projectId);
const projectDir = fs.existsSync(path.join(projectRoot, 'frontend'))
  ? path.join(projectRoot, 'frontend')
  : projectRoot; 

  // Check if already running
  if (activeSandboxes.has(projectId)) {
    return activeSandboxes.get(projectId)!;
  }

  logger.info(`🐳 Starting sandbox for project ${projectId}...`);

  try {
    // Ensure image exists
    const imageName = 'node:20-alpine';
    const images = await docker.listImages({ filters: { reference: [imageName] } });
    
    if (images.length === 0) {
      logger.info(`🚚 Pulling image ${imageName}... This may take a moment.`);
      const stream = await docker.pull(imageName);
      await new Promise((resolve, reject) => {
        docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
      });
      logger.info(`✅ Image ${imageName} ready.`);
    }

    const container = await docker.createContainer({
      Image: imageName,
      Cmd: ['sh', '-c', 'npm install && npm run dev -- --host 0.0.0.0 --port 5173'],
      WorkingDir: '/app',
      ExposedPorts: {
        '5173/tcp': {},
      },
      HostConfig: {
        Binds: [`${projectDir}:/app`],
        PortBindings: {
          '5173/tcp': [{ HostPort: '' }], // OS picks free port
        },
      },
    });

    await container.start();

    const isReady = await waitForVite(container, 120000);
if (!isReady) {
  const logs = await container.logs({ stdout: true, stderr: true, tail: 50 });
  await container.stop().catch(() => {});
  await container.remove().catch(() => {});
  throw new Error(`Vite did not start in time. Logs:\n${logs.toString()}`);
}

    // Wait ~3 seconds for Vite to boot
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Get the assigned port
    const info = await container.inspect();
    const portString = info.NetworkSettings.Ports['5173/tcp']?.[0]?.HostPort;

    if (!portString) {
      await container.stop();
      await container.remove();
      throw new Error('Failed to get sandbox port after container start');
    }

    const port = parseInt(portString, 10);
    const previewUrl = `http://localhost:${port}`;
    
    const result: SandboxResult = {
      containerId: container.id,
      previewUrl,
      port,
    };

    activeSandboxes.set(projectId, result);
    logger.info(`✅ Sandbox running at ${previewUrl}`);

    return result;
  } catch (error: any) {
    logger.error('Sandbox startup error:', error);
    if (error.code === 'ENOENT' || error.syscall === 'connect' || error.message.includes('ECONNREFUSED')) {
      throw new Error('Docker is not running. Please start Docker Desktop and try again.');
    }
    if (error.message.includes('No such image')) {
      throw new Error('Docker image not found. We were unable to pull node:20-alpine. Check your internet connection.');
    }
    throw new Error(`Failed to start sandbox: ${error.message}`);
  }
};

export const stopSandbox = async (projectId: string): Promise<void> => {
  const sandbox = activeSandboxes.get(projectId);
  if (!sandbox) {
    logger.warn(`No active sandbox found for project ${projectId}`);
    return;
  }

  try {
    const container = docker.getContainer(sandbox.containerId);
    await container.stop();
    await container.remove();
    activeSandboxes.delete(projectId);
    logger.info(`🛑 Sandbox for project ${projectId} stopped and removed`);
  } catch (error) {
    logger.error(`Error stopping sandbox for project ${projectId}:`, error);
    throw error;
  }
};
