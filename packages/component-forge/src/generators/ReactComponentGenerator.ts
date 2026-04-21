import type { DesignTokenSet } from '@nexus/design-tokens';

import type { ComponentSpec, GeneratedComponent } from '../types.js';

export class ReactComponentGenerator {
  generate(spec: ComponentSpec, tokens: DesignTokenSet): GeneratedComponent {
    const body = spec.sections
      .map((section) => `        <section data-section="${section}">${section}</section>`)
      .join('\n');

    return {
      framework: 'react',
      filename: `${spec.name}.tsx`,
      tokens,
      source: [
        `export function ${spec.name}() {`,
        '  return (',
        '    <main aria-label="Nexus generated surface">',
        body,
        '    </main>',
        '  );',
        '}',
      ].join('\n'),
    };
  }
}