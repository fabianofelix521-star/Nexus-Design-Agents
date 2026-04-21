import type { ComponentSpec, ValidationIssue } from '../types.js';

export class ResponsivenessValidator {
  validate(spec: ComponentSpec): ValidationIssue[] {
    if (spec.sections.some((section) => section.length > 24)) {
      return [{ severity: 'info', message: 'Long section labels may need responsive wrapping.' }];
    }

    return [];
  }
}