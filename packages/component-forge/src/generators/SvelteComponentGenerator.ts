import type { DesignTokenSet } from '@nexus/design-tokens';

import type { ComponentSpec, GeneratedComponent } from '../types.js';

export class SvelteComponentGenerator {
  generate(spec: ComponentSpec, tokens: DesignTokenSet): GeneratedComponent {
    const body = spec.sections
      .map((section) => `  <section data-section="${section}">${section}</section>`)
      .join('\n');

    return {
      framework: 'svelte',
      filename: `${spec.name}.svelte`,
      tokens,
      source: ['<main aria-label="Nexus generated surface">', body, '</main>'].join('\n'),
    };
  }
}