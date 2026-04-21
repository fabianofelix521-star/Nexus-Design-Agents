import { BaseDesignAgent } from './BaseDesignAgent.js';
import type { AgentContext, AgentResult, AgentTask, DesignArtifact } from '../types.js';

export class DesignCriticAgent extends BaseDesignAgent {
  constructor() {
    super({
      name: 'DesignCriticAgent',
      role: 'Challenges drift, redundancy, and over-designed surfaces.',
      capabilities: ['review', 'critique', 'quality'],
      priorityBias: 1,
    });
  }

  async execute(task: AgentTask, _context: AgentContext): Promise<AgentResult> {
    const risks = [
      'Too many simultaneous visual claims can weaken primary CTA salience.',
      'Target adapters must stay deterministic enough to diff and review.',
    ];

    const artifact: DesignArtifact = {
      id: 'design-critique',
      kind: 'workflow',
      title: 'Critical review',
      content: { risks },
      tags: ['quality', 'review'],
    };

    return {
      agent: this.profile.name,
      summary: `Flagged ${risks.length} systemic risks for ${task.brief.projectName}.`,
      artifacts: [artifact],
      decisions: [
        {
          title: 'Prefer composable subsystems over empty ontology sprawl',
          reasoning: 'A public repo needs credible execution paths, not hundreds of disconnected placeholders.',
          confidence: 0.93,
          source: this.profile.name,
        },
      ],
    };
  }
}