import type { InstructionBundle, LLMInvocation, LLMModelProfile } from '../types.js';

export abstract class BaseLLMAdapter {
  protected constructor(private readonly profile: LLMModelProfile) {}

  getProfile(): LLMModelProfile {
    return this.profile;
  }

  buildInvocation(bundle: InstructionBundle, model = this.profile.defaultModel): LLMInvocation {
    return {
      provider: this.profile.provider,
      model,
      payload: this.buildPayload(bundle, model),
    };
  }

  protected abstract buildPayload(bundle: InstructionBundle, model: string): Record<string, unknown>;
}