import { StaticLLMAdapter } from './StaticLLMAdapter.js';

export class OllamaAdapter extends StaticLLMAdapter {
  constructor() {
    super({
      provider: 'ollama',
      defaultModel: 'qwen3:latest',
      capabilities: ['tool-use', 'code-editing', 'multi-agent'],
    });
  }
}