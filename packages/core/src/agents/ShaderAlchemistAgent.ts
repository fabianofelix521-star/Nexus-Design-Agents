import { BaseDesignAgent } from './BaseDesignAgent.js';
import type { AgentContext, AgentResult, AgentTask, DesignArtifact } from '../types.js';

export class ShaderAlchemistAgent extends BaseDesignAgent {
  constructor() {
    super({
      name: 'ShaderAlchemistAgent',
      role: 'Generates GPU-aware visual atmospheres.',
      capabilities: ['shader', 'webgpu', 'visual'],
      priorityBias: 1,
    });
  }

  async execute(task: AgentTask, _context: AgentContext): Promise<AgentResult> {
    const shaderCode = [
      '@group(0) @binding(0) var<uniform> time: f32;',
      '@fragment',
      'fn fs_main(@builtin(position) pos: vec4<f32>) -> @location(0) vec4<f32> {',
      '  let glow = 0.5 + 0.5 * sin(time + pos.x * 0.01);',
      '  return vec4<f32>(0.07 + glow * 0.18, 0.15, 0.22 + glow * 0.24, 1.0);',
      '}',
    ].join('\n');

    const artifact: DesignArtifact = {
      id: 'hero-shader',
      kind: 'workflow',
      title: 'Hero shader concept',
      content: {
        type: 'background',
        wgsl: shaderCode,
      },
      tags: ['shader', 'wgsl', 'webgpu'],
    };

    return {
      agent: this.profile.name,
      summary: `Prepared a lightweight shader concept for ${task.brief.projectName}.`,
      artifacts: [artifact],
      decisions: [
        {
          title: 'Use budget-aware shader presets',
          reasoning: 'Visual ambition should default to a degradable preset so host environments can fall back cleanly.',
          confidence: 0.82,
          source: this.profile.name,
        },
      ],
    };
  }
}