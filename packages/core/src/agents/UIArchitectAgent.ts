import { BaseDesignAgent } from './BaseDesignAgent.js';
import type { AgentContext, AgentResult, AgentTask, DesignArtifact } from '../types.js';

export class UIArchitectAgent extends BaseDesignAgent {
  constructor() {
    super({
      name: 'UIArchitectAgent',
      role: 'Defines layout, hierarchy, and interaction frame.',
      capabilities: ['layout', 'hierarchy', 'ux'],
      priorityBias: 1,
    });
  }

  async execute(task: AgentTask, _context: AgentContext): Promise<AgentResult> {
    const sections = ['hero', 'evidence-band', 'feature-grid', 'workflow', 'cta'];
    const artifact: DesignArtifact = {
      id: 'ui-architecture',
      kind: 'component-spec',
      title: 'Interface architecture',
      content: {
        layout: sections,
        framework: task.brief.targetFramework,
      },
      tags: ['layout', 'architecture'],
    };

    return {
      agent: this.profile.name,
      summary: `Structured ${task.brief.projectName} around ${sections.length} primary sections.`,
      artifacts: [artifact],
      decisions: [
        {
          title: 'Adopt layered layout hierarchy',
          reasoning: 'A hero-to-proof-to-action progression gives the runtime a predictable information gradient.',
          confidence: 0.84,
          source: this.profile.name,
        },
      ],
    };
  }
}