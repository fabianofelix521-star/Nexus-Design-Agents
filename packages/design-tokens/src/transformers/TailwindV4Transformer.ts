import type { DesignTokenSet } from '../types.js';

export class TailwindV4Transformer {
  transform(tokens: DesignTokenSet): Record<string, unknown> {
    return {
      theme: {
        extend: {
          colors: tokens.color,
          spacing: tokens.spacing,
          fontFamily: {
            display: tokens.typography['font.family.display'],
            body: tokens.typography['font.family.body'],
            mono: tokens.typography['font.family.mono'],
          },
        },
      },
    };
  }
}