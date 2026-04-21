import { StaticLLMAdapter } from './StaticLLMAdapter.js';

export class DeepSeekAdapter extends StaticLLMAdapter {
  constructor() {
    super({
      provider: 'deepseek',
      defaultModel: 'deepseek-reasoner',
      capabilities: ['tool-use', 'code-editing', 'long-context'],
    });
  }
}