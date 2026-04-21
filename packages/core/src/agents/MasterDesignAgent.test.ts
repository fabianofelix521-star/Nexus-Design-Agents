import { describe, expect, it } from 'vitest';

import { MasterDesignAgent } from './MasterDesignAgent.js';

describe('MasterDesignAgent', () => {
  it('generates a portable design output with an instruction bundle', async () => {
    const masterAgent = MasterDesignAgent.createDefault();
    const output = await masterAgent.executeDesign({
      projectName: 'nexus-design-agi',
      objective: 'Export a portable design-agent runtime.',
      audience: ['design engineers'],
      channels: ['web', 'agent-runtime'],
      constraints: [
        {
          name: 'accessibility baseline',
          description: 'Respect reduced motion defaults.',
          severity: 'hard',
        },
      ],
      moods: ['cinematic', 'credible'],
      targetFramework: 'react',
      targetRuntimes: ['vscode', 'openclaw'],
    });

    expect(output.artifacts.some((artifact) => artifact.kind === 'instruction-bundle')).toBe(true);
    expect(output.decisions.some((decision) => decision.source === 'GovernanceAgent')).toBe(true);
    expect(output.strategySummary).toContain('Novelty target');
  });
});