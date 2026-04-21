import { StaticLLMAdapter } from './StaticLLMAdapter.js';

export class ClaudeAdapter extends StaticLLMAdapter {
  constructor() {
    super({
      provider: 'anthropic',
      defaultModel: 'claude-sonnet-4.5',
      capabilities: ['tool-use', 'streaming', 'multi-agent', 'long-context'],
    });
  }
}