import path from 'node:path';

import { ReactComponentGenerator, SvelteComponentGenerator, VueComponentGenerator } from '@nexus/component-forge';
import { MasterDesignAgent, RuntimeAdapterRegistry, type InstructionBundle } from '@nexus/core';
import { CSSVariableTransformer, SemanticTokenMapper } from '@nexus/design-tokens';

import {
  extractPalette,
  findInstructionBundle,
  getOutputDir,
  getTarget,
  loadBrief,
  parseArgMap,
  writeJson,
  writeText,
} from './shared.js';

function isInstructionBundle(value: Record<string, unknown>): value is InstructionBundle {
  return (
    typeof value.target === 'string' &&
    Array.isArray(value.messages) &&
    Array.isArray(value.files) &&
    typeof value.metadata === 'object' &&
    value.metadata !== null
  );
}

export async function runExportCommand(argv: string[]): Promise<void> {
  const args = parseArgMap(argv);
  const briefPath = args.get('brief');

  if (!briefPath) {
    throw new Error('Missing required --brief argument.');
  }

  const outputDir = getOutputDir(args);
  const target = getTarget(args.get('target'));
  const brief = await loadBrief(briefPath);
  const agent = MasterDesignAgent.createDefault();
  const output = await agent.executeDesign(brief, target);
  const palette = extractPalette(output);
  const tokens = new SemanticTokenMapper().compose(palette);
  const css = new CSSVariableTransformer().transform(tokens);
  const componentSpec = {
    name: 'NexusSurface',
    description: output.strategySummary,
    sections: ['hero', 'capability-grid', 'agent-topology', 'cta'],
  };

  const generator =
    brief.targetFramework === 'vue'
      ? new VueComponentGenerator()
      : brief.targetFramework === 'svelte'
        ? new SvelteComponentGenerator()
        : new ReactComponentGenerator();

  const component = generator.generate(componentSpec, tokens);
  const bundle = findInstructionBundle(output);
  const adapter = new RuntimeAdapterRegistry().resolve(target);
  const manifest =
    adapter && isInstructionBundle(bundle)
      ? adapter.buildBootstrapManifest(bundle)
      : {
          target,
          entryFile: 'instruction-bundle.json',
        };

  await writeJson(path.join(outputDir, 'design-output.json'), output);
  await writeJson(path.join(outputDir, 'instruction-bundle.json'), bundle);
  await writeJson(path.join(outputDir, `${target}-adapter-manifest.json`), manifest);
  await writeText(path.join(outputDir, 'tokens.css'), css);
  await writeText(path.join(outputDir, component.filename), component.source);
}