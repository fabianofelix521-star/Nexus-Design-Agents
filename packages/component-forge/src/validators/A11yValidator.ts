import type { ComponentSpec, ValidationIssue } from '../types.js';

export class A11yValidator {
  validate(spec: ComponentSpec): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    if (!spec.sections.includes('cta')) {
      issues.push({ severity: 'warning', message: 'Primary CTA section is missing.' });
    }

    if (!spec.sections.includes('hero')) {
      issues.push({ severity: 'warning', message: 'Hero section is missing a landmark entry point.' });
    }

    return issues;
  }
}