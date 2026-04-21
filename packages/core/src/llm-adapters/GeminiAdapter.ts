import { StaticLLMAdapter } from './StaticLLMAdapter.js';

export class GeminiAdapter extends StaticLLMAdapter {
  constructor() {
    super({
      provider: 'google',
      defaultModel: 'gemini-2.5-pro',
      capabilities: ['tool-use', 'streaming', 'multi-agent', 'long-context'],
    });
  }
}