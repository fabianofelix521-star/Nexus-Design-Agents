import { describe, expect, it } from 'vitest';

import { NeuroAestheticEngine } from './NeuroAestheticEngine.js';

describe('NeuroAestheticEngine', () => {
  it('predicts hotspots for high-salience elements', () => {
    const engine = new NeuroAestheticEngine();
    const result = engine.predictVisualSalience({
      width: 1440,
      height: 900,
      elements: [
        {
          id: 'hero-cta',
          x: 200,
          y: 120,
          width: 320,
          height: 96,
          weight: 0.9,
          contrast: 0.85,
          motion: 0.2,
          semanticRole: 'cta',
        },
        {
          id: 'support-copy',
          x: 220,
          y: 280,
          width: 480,
          height: 120,
          weight: 0.4,
          contrast: 0.3,
          semanticRole: 'body',
        },
      ],
    });

    expect(result.hotspots).toHaveLength(1);
    expect(result.hotspots[0]?.reason).toBe('contrast');
    expect(result.hierarchyLevels[0]?.elementId).toBe('hero-cta');
  });
});