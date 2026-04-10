import { plannerAgent } from './plannerAgent';
import { uiAgent } from './uiAgent';
import { backendAgent } from './backendAgent';
import { devopsAgent } from './devopsAgent';
import type { OrchestratorResult, PlannerOutput, AgentFilesOutput } from '@shared/types/types';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@shared/constants/messages';
import { logger } from '@shared/utils/logger';
import { parseJSON } from '@shared/utils/json';

const runAgentTask = async (
  agent: (task: string) => Promise<string>,
  task: string,
  successMsg: string
): Promise<AgentFilesOutput | null> => {
  logger.info(successMsg);
  const raw = await agent(task);
  return parseJSON<AgentFilesOutput>(raw);
};

export const orchestrate = async (userMessage: string): Promise<OrchestratorResult> => {
  logger.info(SUCCESS_MESSAGES.PLANNER_AGENT_THINKING_SUCCESS);
  
  const planRaw = await plannerAgent(userMessage);
  const plan = parseJSON<PlannerOutput>(planRaw);

  if (!plan) throw new Error(ERROR_MESSAGES.PLANNER_AGENT_THINKING_ERROR);

  const results = await Promise.all([
    runAgentTask(uiAgent, plan.tasks.ui, SUCCESS_MESSAGES.UI_AGENT_THINKING_SUCCESS),
    runAgentTask(backendAgent, plan.tasks.backend, SUCCESS_MESSAGES.BACKEND_AGENT_THINKING_SUCCESS),
    runAgentTask(devopsAgent, plan.tasks.devops, SUCCESS_MESSAGES.DEVOPS_AGENT_THINKING_SUCCESS),
  ]);

  return {
    plan,
    files: results.flatMap(res => res?.files ?? []),
  };
};