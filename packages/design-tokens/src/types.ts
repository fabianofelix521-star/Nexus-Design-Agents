export interface DesignTokenSet {
  color: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, string | number>;
  motion: Record<string, string | number>;
}

export interface TokenPreset {
  name: string;
  description: string;
  colors: Record<string, string>;
}