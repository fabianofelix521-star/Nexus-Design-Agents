import type { AgentContext, AgentProfile, AgentResult, AgentTask } from '../types.js';

export abstract class BaseDesignAgent {
  protected readonly profile: AgentProfile;

  protected constructor(profile: AgentProfile) {
    this.profile = profile;
  }

  getProfile(): AgentProfile {
    return this.profile;
  }

  supports(task: AgentTask): boolean {
    return this.profile.capabilities.some((capability) =>
      task.objective.toLowerCase().includes(capability.toLowerCase()),
    );
  }

  abstract execute(task: AgentTask, context: AgentContext): Promise<AgentResult>;
}