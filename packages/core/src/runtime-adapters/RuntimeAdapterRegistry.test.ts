import { describe, expect, it } from 'vitest';

import { RuntimeAdapterRegistry } from './RuntimeAdapterRegistry.js';
import type { InstructionBundle } from '../types.js';

describe('RuntimeAdapterRegistry', () => {
  it('builds bootstrap manifests and negotiates capabilities for OpenClaw', () => {
    const registry = new RuntimeAdapterRegistry();
    const adapter = registry.resolve('openclaw');
    const bundle: InstructionBundle = {
      target: 'openclaw',
      messages: [
        { role: 'system', content: 'system' },
        { role: 'developer', content: 'developer' },
        { role: 'user', content: 'user' },
      ],
      files: [{ path: 'agents/openclaw/nexus-agent.json', content: '{}' }],
      metadata: {
        selectedAgents: ['UIArchitectAgent', 'AgentBridgeAgent'],
        capabilities: ['multi-agent', 'tool-use', 'plan-management'],
        framework: 'react',
      },
    };

    expect(adapter).toBeDefined();

    const manifest = adapter?.buildBootstrapManifest(bundle) as Record<string, unknown>;
    const response = adapter?.negotiate(bundle, ['tool-use', 'multi-agent']);

    expect(manifest.target).toBe('openclaw');
    expect(response?.accepted).toBe(true);
    expect(response?.missingCapabilities).toEqual(['plan-management']);
  });
});