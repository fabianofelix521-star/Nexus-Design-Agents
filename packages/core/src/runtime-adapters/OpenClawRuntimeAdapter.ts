import { BaseRuntimeAdapter } from './BaseRuntimeAdapter.js';

export class OpenClawRuntimeAdapter extends BaseRuntimeAdapter {
  constructor() {
    super({
      target: 'openclaw',
      displayName: 'Nexus OpenClaw Adapter',
      protocolVersion: '2026-04-21',
      entryFile: 'agents/openclaw/nexus-agent.json',
      transport: {
        mode: 'stdin',
        payload: 'json',
      },
      capabilities: ['multi-agent', 'tool-use', 'code-editing', 'plan-management', 'long-context'],
      handshake: {
        requestType: 'nexus.handshake.init',
        responseType: 'openclaw.handshake.ack',
        requiresAck: true,
        supportedArtifacts: ['instruction-bundle', 'workflow', 'component-spec'],
      },
    });
  }
}