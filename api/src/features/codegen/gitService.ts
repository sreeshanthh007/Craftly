import simpleGit from 'simple-git';
import fs from 'fs-extra';
import path from 'path';
import type { GeneratedFileOutput } from '@shared/types/types';
import { logger } from '@shared/utils/logger';

const PROJECTS_DIR = path.join(process.cwd(), 'generated_projects');

export const saveFilesToDisk = async (
  projectId: string,
  files: GeneratedFileOutput[]
): Promise<string> => {
  const projectDir = path.join(PROJECTS_DIR, projectId);

  await fs.ensureDir(projectDir);

  for (const file of files) {
    const filePath = path.join(projectDir, file.path);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, file.content, 'utf-8');
  }

  const git = simpleGit(projectDir);
  await git.init();
  await git.add('.');
  await git.commit('Initial generated project by Craftly');

  logger.info(`✅ Git commit done for project ${projectId}`);
  return projectDir;
};