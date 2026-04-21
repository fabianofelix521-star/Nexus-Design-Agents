export class TypographyTokenGenerator {
  generate(display = 'Fraunces', body = 'Manrope', mono = 'IBM Plex Mono'): Record<string, string | number> {
    return {
      'font.family.display': display,
      'font.family.body': body,
      'font.family.mono': mono,
      'font.size.1': '0.875rem',
      'font.size.2': '1rem',
      'font.size.3': '1.25rem',
      'font.size.4': '1.75rem',
      'font.size.5': '2.5rem',
      'font.weight.regular': 400,
      'font.weight.medium': 500,
      'font.weight.bold': 700,
    };
  }
}