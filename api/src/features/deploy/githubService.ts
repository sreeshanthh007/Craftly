import { Octokit } from '@octokit/rest';
import simpleGit from 'simple-git';
import path from 'path';
import { ENV } from '@shared/constants/env';
import { logger } from '@shared/utils/logger';

const octokit = new Octokit({ auth: ENV.GITHUB_TOKEN });
const PROJECTS_DIR = path.join(process.cwd(), 'generated_projects');

export const pushToGitHub = async (projectId: string): Promise<string> => {
  const repoName = `craftly-${projectId}`;
  const projectDir = path.join(PROJECTS_DIR, projectId);

  // 1. Create GitHub repo
  await octokit.repos.createForAuthenticatedUser({
    name: repoName,
    private: false,
    auto_init: false,
  });

  const repoUrl = `https://github.com/${ENV.GITHUB_USERNAME}/${repoName}.git`;

  // 2. Add remote and push (repo was already git-init'd by gitService.ts)
  const git = simpleGit(projectDir);

  // Set the remote (may already exist — remove first to be safe)
  const remotes = await git.getRemotes();
  if (remotes.find(r => r.name === 'origin')) {
    await git.removeRemote('origin');
  }

  await git.addRemote('origin', repoUrl);

  // Use token in URL for auth
  const authedUrl = `https://${ENV.GITHUB_TOKEN}@github.com/${ENV.GITHUB_USERNAME}/${repoName}.git`;
  await git.remote(['set-url', 'origin', authedUrl]);

  await git.push('origin', 'master', ['--force']);

  logger.info(`✅ Pushed to GitHub: ${repoUrl}`);
  return `https://github.com/${ENV.GITHUB_USERNAME}/${repoName}`;
};
