export class StyleXEngine {
  composeThemeObject(): Record<string, string> {
    return {
      display: 'var(--font-family-display)',
      body: 'var(--font-family-body)',
      accent: 'var(--color-accent)',
    };
  }
}