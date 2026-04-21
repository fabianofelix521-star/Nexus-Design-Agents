import path from 'node:path';

import { MasterDesignAgent } from '@nexus/core';

import { getOutputDir, getTarget, loadBrief, parseArgMap, writeJson } from './shared.js';

export async function runDesignCommand(argv: string[]): Promise<void> {
  const args = parseArgMap(argv);
  const briefPath = args.get('brief');

  if (!briefPath) {
    throw new Error('Missing required --brief argument.');
  }

  const target = getTarget(args.get('target'));
  const outputDir = getOutputDir(args);
  const brief = await loadBrief(briefPath);
  const agent = MasterDesignAgent.createDefault();
  const output = await agent.executeDesign(brief, target);

  await writeJson(path.join(outputDir, 'design-output.json'), output);
}