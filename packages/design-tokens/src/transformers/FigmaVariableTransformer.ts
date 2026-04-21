import type { DesignTokenSet } from '../types.js';

export class FigmaVariableTransformer {
  transform(tokens: DesignTokenSet): Record<string, unknown> {
    return {
      collections: [
        { name: 'Color', values: tokens.color },
        { name: 'Spacing', values: tokens.spacing },
        { name: 'Typography', values: tokens.typography },
        { name: 'Motion', values: tokens.motion },
      ],
    };
  }
}