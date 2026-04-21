import type { ValidationIssue } from '../types.js';

export class GPUPerformanceValidator {
  validate(shaderCount: number): ValidationIssue[] {
    if (shaderCount > 2) {
      return [{ severity: 'warning', message: 'More than two simultaneous shader surfaces may exceed mid-tier GPU budgets.' }];
    }

    return [];
  }
}