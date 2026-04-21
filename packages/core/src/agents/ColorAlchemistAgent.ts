import { BaseDesignAgent } from './BaseDesignAgent.js';
import type { AgentContext, AgentResult, AgentTask, DesignArtifact } from '../types.js';

export class ColorAlchemistAgent extends BaseDesignAgent {
  constructor() {
    super({
      name: 'ColorAlchemistAgent',
      role: 'Translates intent into scalable color systems.',
      capabilities: ['color', 'palette', 'emotion'],
      priorityBias: 1,
    });
  }

  async execute(task: AgentTask, _context: AgentContext): Promise<AgentResult> {
    const palette = {
      ink: 'oklch(16% 0.03 250)',
      canvas: 'oklch(96% 0.02 95)',
      accent: task.brief.moods.includes('cinematic') ? 'oklch(69% 0.21 32)' : 'oklch(64% 0.18 195)',
      support: 'oklch(78% 0.08 210)',
    };

    const artifact: DesignArtifact = {
      id: 'color-system',
      kind: 'design-token-set',
      title: 'Emotional color system',
      content: palette,
      tags: ['color', 'tokens', 'oklch'],
    };

    return {
      agent: this.profile.name,
      summary: `Generated an OKLCH palette tuned for ${task.brief.moods.join(', ')}.`,
      artifacts: [artifact],
      decisions: [
        {
          title: 'Use perceptual color tokens',
          reasoning: 'OKLCH keeps contrast and interpolation stable across IDE and agent host surfaces.',
          confidence: 0.88,
          source: this.profile.name,
        },
      ],
    };
  }
}