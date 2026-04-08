
import { plannerAgent } from './plannerAgent';
import { uiAgent } from './uiAgent';
import { backendAgent } from './backendAgent';
import { devopsAgent } from './devopsAgent';
import type { OrchestratorResult, PlannerOutput, AgentFilesOutput } from '@shared/types/types';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@shared/constants/messages';
import { logger } from '@shared/utils/logger';

const parseJSON = <T>(raw: string): T | null => {
  try {
    const cleaned = raw.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleaned) as T;
  } catch {
    return null;
  }
};

export const orchestrate = async (
  userMessage: string
): Promise<OrchestratorResult> => {
  
  logger.info(SUCCESS_MESSAGES.PLANNER_AGENT_THINKING_SUCCESS);

  const planRaw = await plannerAgent(userMessage);
  const plan = parseJSON<PlannerOutput>(planRaw);

  if (!plan) {
    throw new Error(ERROR_MESSAGES.PLANNER_AGENT_THINKING_ERROR);
  }

  logger.info(SUCCESS_MESSAGES.UI_AGENT_THINKING_SUCCESS);
  const uiRaw = await uiAgent(plan.tasks.ui);
  const uiResult = parseJSON<AgentFilesOutput>(uiRaw);

  logger.info(SUCCESS_MESSAGES.BACKEND_AGENT_THINKING_SUCCESS);
  const backendRaw = await backendAgent(plan.tasks.backend);
  const backendResult = parseJSON<AgentFilesOutput>(backendRaw);

  logger.info(SUCCESS_MESSAGES.DEVOPS_AGENT_THINKING_SUCCESS);
  const devopsRaw = await devopsAgent(plan.tasks.devops);
  const devopsResult = parseJSON<AgentFilesOutput>(devopsRaw);

  const allFiles = [
    ...(uiResult?.files ?? []),
    ...(backendResult?.files ?? []),
    ...(devopsResult?.files ?? []),
  ];

  return {
    plan,
    files: allFiles,
  };
};