import type { DesignTokenSet } from '../types.js';

export class CSSVariableTransformer {
  transform(tokens: DesignTokenSet): string {
    const sections = [tokens.color, tokens.spacing, tokens.typography, tokens.motion]
      .flatMap((group) => Object.entries(group))
      .map(([key, value]) => `  --${key.replace(/\./g, '-')}: ${String(value)};`);

    return [':root {', ...sections, '}'].join('\n');
  }
}