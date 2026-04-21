import type { ComponentSpec, ValidationIssue } from '../types.js';

export class PerformanceValidator {
  validate(spec: ComponentSpec): ValidationIssue[] {
    if (spec.sections.length > 8) {
      return [{ severity: 'warning', message: 'Component may be too dense for first-paint budgets.' }];
    }

    return [];
  }
}