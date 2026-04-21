import type { AdapterTarget, DesignBrief, DesignOutput, InstructionBundle } from '../types.js';

export interface HarnessCompileRequest {
  brief: DesignBrief;
  output: DesignOutput;
  target: AdapterTarget;
}

export class NaturalLanguageHarness {
  compile(request: HarnessCompileRequest): InstructionBundle {
    const projectSummary = [
      `Project: ${request.brief.projectName}`,
      `Objective: ${request.brief.objective}`,
      `Audience: ${request.brief.audience.join(', ')}`,
      `Channels: ${request.brief.channels.join(', ')}`,
      `Framework: ${request.brief.targetFramework}`,
    ].join('\n');

    return {
      target: request.target,
      messages: [
        {
          role: 'system',
          content:
            'You are Nexus Design AGI. Operate as a portable design-engineering runtime with strict attention to design quality, accessibility, and implementation realism.',
        },
        {
          role: 'developer',
          content: [
            'Prioritize the supplied design decisions, keep changes minimal and testable, and adapt file formats to the host target.',
            `Selected strategy: ${request.output.strategySummary}`,
          ].join('\n'),
        },
        {
          role: 'user',
          content: [projectSummary, this.renderDecisionBlock(request.output)].join('\n\n'),
        },
      ],
      files: [
        {
          path: this.resolveInstructionPath(request.target),
          content: [projectSummary, this.renderDecisionBlock(request.output)].join('\n\n'),
        },
      ],
      metadata: {
        selectedAgents: request.output.decisions.map((decision) => decision.source),
        capabilities: ['multi-agent', 'code-editing', 'tool-use', 'plan-management'],
        framework: request.brief.targetFramework,
      },
    };
  }

  private renderDecisionBlock(output: DesignOutput): string {
    const lines = output.decisions.map(
      (decision) => `- ${decision.title}: ${decision.reasoning} [${decision.source}]`,
    );
    return ['Key decisions:', ...lines].join('\n');
  }

  private resolveInstructionPath(target: AdapterTarget): string {
    switch (target) {
      case 'vscode':
        return '.github/copilot-instructions.md';
      case 'cursor':
        return '.cursorrules';
      case 'windsurf':
        return '.windsurfrules';
      case 'antigravity':
        return '.antigravity/nexus.instructions.md';
      case 'openclaw':
        return 'agents/openclaw/nexus-agent.json';
      case 'hermes-agent':
        return 'agents/hermes/nexus-agent.yaml';
      default:
        return '.nexus/instruction-bundle.json';
    }
  }
}