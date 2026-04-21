export interface BasePalette {
  ink: string;
  canvas: string;
  accent: string;
  support: string;
}

export class ColorTokenGenerator {
  generate(palette: BasePalette): Record<string, string> {
    return {
      'color.ink': palette.ink,
      'color.canvas': palette.canvas,
      'color.accent': palette.accent,
      'color.support': palette.support,
      'color.surface.elevated': palette.canvas,
      'color.text.primary': palette.ink,
      'color.text.inverse': palette.canvas,
      'color.border.subtle': palette.support,
    };
  }
}