import { StaticLLMAdapter } from './StaticLLMAdapter.js';
import type { LLMModelProfile } from '../types.js';

export class CustomLLMAdapter extends StaticLLMAdapter {
  constructor(profile: LLMModelProfile) {
    super(profile);
  }
}