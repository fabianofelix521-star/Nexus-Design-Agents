import type { DesignBrief, DesignDecision } from '../types.js';

export class DesignMemoryBank {
  private readonly briefHistory = new Map<string, DesignBrief[]>();
  private readonly decisionLog = new Map<string, DesignDecision[]>();

  rememberBrief(brief: DesignBrief): void {
    const history = this.briefHistory.get(brief.projectName) ?? [];
    history.push(brief);
    this.briefHistory.set(brief.projectName, history);
  }

  rememberDecision(projectName: string, decision: DesignDecision): void {
    const history = this.decisionLog.get(projectName) ?? [];
    history.push(decision);
    this.decisionLog.set(projectName, history);
  }

  getDecisionHistory(projectName: string): DesignDecision[] {
    return this.decisionLog.get(projectName) ?? [];
  }

  getPreferredMoods(projectName: string): string[] {
    const history = this.briefHistory.get(projectName) ?? [];
    return [...new Set(history.flatMap((brief) => brief.moods))];
  }
}