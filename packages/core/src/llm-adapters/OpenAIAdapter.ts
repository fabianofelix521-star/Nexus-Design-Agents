import { StaticLLMAdapter } from './StaticLLMAdapter.js';

export class OpenAIAdapter extends StaticLLMAdapter {
  constructor() {
    super({
      provider: 'openai',
      defaultModel: 'gpt-5.4',
      capabilities: ['tool-use', 'streaming', 'multi-agent', 'code-editing', 'long-context'],
    });
  }
}