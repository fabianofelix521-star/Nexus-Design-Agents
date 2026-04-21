export class VanillaExtractEngine {
  composeThemeContract(): string {
    return ['export const theme = {', "  accent: 'var(--color-accent)',", "  canvas: 'var(--color-canvas)',", '};'].join('\n');
  }
}