import { BaseLLMAdapter } from './BaseLLMAdapter.js';
import type { InstructionBundle, LLMModelProfile } from '../types.js';

export class StaticLLMAdapter extends BaseLLMAdapter {
  constructor(profile: LLMModelProfile) {
    super(profile);
  }

  protected buildPayload(bundle: InstructionBundle, model: string): Record<string, unknown> {
    return {
      model,
      messages: bundle.messages,
      metadata: bundle.metadata,
    };
  }
}