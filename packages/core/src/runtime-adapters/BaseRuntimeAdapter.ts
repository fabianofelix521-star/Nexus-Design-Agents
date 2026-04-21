import type {
  InstructionBundle,
  RuntimeAdapterDescriptor,
  RuntimeCapability,
  RuntimeHandshakeRequest,
  RuntimeHandshakeResponse,
} from '../types.js';

export abstract class BaseRuntimeAdapter {
  protected constructor(private readonly descriptor: RuntimeAdapterDescriptor) {}

  describe(): RuntimeAdapterDescriptor {
    return this.descriptor;
  }

  createHandshake(bundle: InstructionBundle): RuntimeHandshakeRequest {
    return {
      target: this.descriptor.target,
      protocolVersion: this.descriptor.protocolVersion,
      entryFile: this.descriptor.entryFile,
      bundleCapabilities: bundle.metadata.capabilities,
      selectedAgents: bundle.metadata.selectedAgents,
      framework: bundle.metadata.framework,
    };
  }

  negotiate(
    bundle: InstructionBundle,
    hostCapabilities: RuntimeCapability[],
  ): RuntimeHandshakeResponse {
    const agreedCapabilities = bundle.metadata.capabilities.filter((capability) =>
      hostCapabilities.includes(capability),
    );
    const missingCapabilities = bundle.metadata.capabilities.filter(
      (capability) => !hostCapabilities.includes(capability),
    );

    return {
      target: this.descriptor.target,
      accepted: agreedCapabilities.length > 0,
      protocolVersion: this.descriptor.protocolVersion,
      agreedCapabilities,
      missingCapabilities,
      entryFile: this.descriptor.entryFile,
    };
  }

  buildBootstrapManifest(bundle: InstructionBundle): Record<string, unknown> {
    return {
      kind: 'nexus-runtime-adapter',
      target: this.descriptor.target,
      displayName: this.descriptor.displayName,
      protocolVersion: this.descriptor.protocolVersion,
      entryFile: this.descriptor.entryFile,
      transport: this.descriptor.transport,
      capabilities: this.descriptor.capabilities,
      handshake: this.createHandshake(bundle),
    };
  }
}