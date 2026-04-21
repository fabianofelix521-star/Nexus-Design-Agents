export class SpacingTokenGenerator {
  generate(base = 4): Record<string, string> {
    return {
      'space.1': `${base}px`,
      'space.2': `${base * 2}px`,
      'space.3': `${base * 3}px`,
      'space.4': `${base * 4}px`,
      'space.6': `${base * 6}px`,
      'space.8': `${base * 8}px`,
      'space.12': `${base * 12}px`,
    };
  }
}