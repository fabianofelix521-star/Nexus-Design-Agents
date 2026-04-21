import { randomUUID } from 'node:crypto';

import { BaseDesignAgent } from '../agents/BaseDesignAgent.js';
import type {
  AgentContext,
  AgentResult,
  AgentSelection,
  AgentTask,
  DesignBrief,
  DesignDecision,
  DesignOutput,
} from '../types.js';

export interface WorkflowRequest {
  brief: DesignBrief;
  objective: string;
  selections: AgentSelection[];
  input?: Record<string, unknown>;
}

export class AgentOrchestrator {
  private readonly registry = new Map<string, BaseDesignAgent>();

  register(agent: BaseDesignAgent): void {
    this.registry.set(agent.getProfile().name, agent);
  }

  async executeWorkflow(request: WorkflowRequest): Promise<DesignOutput> {
    const task: AgentTask = {
      id: randomUUID(),
      brief: request.brief,
      objective: request.objective,
      input: request.input ?? {},
    };

    const context: AgentContext = {
      sharedState: new Map<string, unknown>(),
      selections: request.selections,
    };

    const executionList = request.selections
      .map((selection) => this.registry.get(selection.agent))
      .filter((agent): agent is BaseDesignAgent => Boolean(agent));

    const results = await Promise.all(
      executionList.map((agent) => agent.execute(task, context)),
    );

    return {
      brief: request.brief,
      strategySummary: this.buildStrategySummary(results),
      decisions: this.mergeDecisions(results),
      artifacts: results.flatMap((result) => result.artifacts),
    };
  }

  private buildStrategySummary(results: AgentResult[]): string {
    if (results.length === 0) {
      return 'No specialist agents were available for this workflow.';
    }

    return results.map((result) => `${result.agent}: ${result.summary}`).join(' | ');
  }

  private mergeDecisions(results: AgentResult[]): DesignDecision[] {
    return results.flatMap((result) => result.decisions);
  }
}