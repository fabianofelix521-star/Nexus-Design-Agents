import { ColorTokenGenerator, type BasePalette } from './ColorTokenGenerator.js';
import { MotionTokenGenerator } from './MotionTokenGenerator.js';
import { SpacingTokenGenerator } from './SpacingTokenGenerator.js';
import { TypographyTokenGenerator } from './TypographyTokenGenerator.js';
import type { DesignTokenSet } from '../types.js';

export class SemanticTokenMapper {
  constructor(
    private readonly color = new ColorTokenGenerator(),
    private readonly spacing = new SpacingTokenGenerator(),
    private readonly typography = new TypographyTokenGenerator(),
    private readonly motion = new MotionTokenGenerator(),
  ) {}

  compose(palette: BasePalette): DesignTokenSet {
    return {
      color: this.color.generate(palette),
      spacing: this.spacing.generate(),
      typography: this.typography.generate(),
      motion: this.motion.generate(),
    };
  }
}