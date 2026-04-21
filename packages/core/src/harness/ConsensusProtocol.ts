import type { AgentResult, ConsensusDecision, DesignDecision } from '../types.js';

export class ConsensusProtocol {
  synthesize(results: AgentResult[]): ConsensusDecision {
    const decisionsByTitle = new Map<string, DesignDecision>();

    for (const decision of results.flatMap((result) => result.decisions)) {
      const existing = decisionsByTitle.get(decision.title);
      if (!existing || decision.confidence > existing.confidence) {
        decisionsByTitle.set(decision.title, decision);
      }
    }

    return {
      summary: results.map((result) => result.summary).join(' | '),
      decisions: [...decisionsByTitle.values()],
    };
  }
}