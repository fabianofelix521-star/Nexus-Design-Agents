import type { DesignTokenSet } from '@nexus/design-tokens';

export interface ComponentSpec {
  name: string;
  description: string;
  sections: string[];
}

export interface GeneratedComponent {
  framework: string;
  filename: string;
  source: string;
  tokens: DesignTokenSet;
}

export interface ValidationIssue {
  severity: 'info' | 'warning' | 'error';
  message: string;
}