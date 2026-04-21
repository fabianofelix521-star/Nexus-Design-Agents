import path from 'node:path';

import type { DesignBrief } from '@nexus/core';

import { ensureDirectory, writeJson } from './shared.js';

export async function runInitCommand(argv: string[]): Promise<void> {
  const targetDir = argv[0] ?? process.cwd();
  const nexusDir = path.join(targetDir, '.nexus');
  const exampleBrief: DesignBrief = {
    projectName: 'nexus-design-agi',
    objective: 'Build a portable multi-agent design runtime for IDEs and agent frameworks.',
    audience: ['design engineers', 'AI product teams', 'tooling teams'],
    channels: ['web', 'agent-runtime'],
    constraints: [
      { name: 'accessibility baseline', description: 'Respect reduced motion and semantic output defaults.', severity: 'hard' },
      { name: 'portable artifacts', description: 'Outputs must adapt to multiple AI software targets.', severity: 'hard' },
    ],
    moods: ['cinematic', 'systemic', 'credible'],
    targetFramework: 'react',
    targetRuntimes: ['vscode', 'cursor', 'openclaw'],
  };

  await ensureDirectory(nexusDir);
  await writeJson(path.join(nexusDir, 'brief.example.json'), exampleBrief);
}