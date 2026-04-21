import { BaseRuntimeAdapter } from './BaseRuntimeAdapter.js';

export class HermesRuntimeAdapter extends BaseRuntimeAdapter {
  constructor() {
    super({
      target: 'hermes-agent',
      displayName: 'Nexus Hermes Adapter',
      protocolVersion: '2026-04-21',
      entryFile: 'agents/hermes/nexus-agent.yaml',
      transport: {
        mode: 'http',
        payload: 'yaml',
      },
      capabilities: ['multi-agent', 'tool-use', 'code-editing', 'streaming', 'long-context'],
      handshake: {
        requestType: 'nexus.handshake.init',
        responseType: 'hermes.handshake.ready',
        requiresAck: true,
        supportedArtifacts: ['instruction-bundle', 'workflow', 'design-token-set'],
      },
    });
  }
}