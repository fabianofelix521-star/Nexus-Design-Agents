import type { DesignTokenSet } from '@nexus/design-tokens';

import type { ComponentSpec, GeneratedComponent } from '../types.js';

export class VueComponentGenerator {
  generate(spec: ComponentSpec, tokens: DesignTokenSet): GeneratedComponent {
    const body = spec.sections
      .map((section) => `    <section data-section="${section}">${section}</section>`)
      .join('\n');

    return {
      framework: 'vue',
      filename: `${spec.name}.vue`,
      tokens,
      source: ['<template>', '  <main aria-label="Nexus generated surface">', body, '  </main>', '</template>'].join('\n'),
    };
  }
}