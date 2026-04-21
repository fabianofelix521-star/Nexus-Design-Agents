import type { DesignBrief, DesignDecision, GovernanceIssue, InstructionBundle } from '../types.js';

export interface GovernanceReview {
  issues: GovernanceIssue[];
  decisions: DesignDecision[];
}

export class GovernanceAgent {
  reviewBundle(bundle: InstructionBundle, brief: DesignBrief): GovernanceReview {
    const issues: GovernanceIssue[] = [];
    const decisions: DesignDecision[] = [];

    if (!bundle.messages.some((message) => message.role === 'system')) {
      issues.push({ severity: 'error', message: 'Instruction bundle is missing a system message.' });
    }

    if (!brief.constraints.some((constraint) => constraint.name.toLowerCase().includes('access'))) {
      issues.push({
        severity: 'warning',
        message: 'Brief does not explicitly mention accessibility. Default accessibility guardrails were applied.',
      });
    }

    decisions.push({
      title: 'Governance review completed',
      reasoning: issues.length === 0 ? 'No structural governance risks detected.' : issues.map((issue) => issue.message).join(' | '),
      confidence: issues.some((issue) => issue.severity === 'error') ? 0.58 : 0.86,
      source: 'GovernanceAgent',
    });

    return { issues, decisions };
  }
}