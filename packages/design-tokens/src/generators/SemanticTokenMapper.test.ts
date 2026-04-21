import { describe, expect, it } from 'vitest';

import { SemanticTokenMapper } from './SemanticTokenMapper.js';
import { CSSVariableTransformer } from '../transformers/CSSVariableTransformer.js';

describe('SemanticTokenMapper', () => {
  it('creates a token set that can be transformed into CSS variables', () => {
    const mapper = new SemanticTokenMapper();
    const tokens = mapper.compose({
      ink: 'oklch(18% 0.03 255)',
      canvas: 'oklch(97% 0.01 95)',
      accent: 'oklch(64% 0.18 196)',
      support: 'oklch(80% 0.05 210)',
    });
    const css = new CSSVariableTransformer().transform(tokens);

    expect(tokens.color['color.accent']).toBe('oklch(64% 0.18 196)');
    expect(css).toContain('--color-accent: oklch(64% 0.18 196);');
    expect(css).toContain('--space-4: 16px;');
  });
});