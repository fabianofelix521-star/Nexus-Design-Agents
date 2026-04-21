import type { InstructionBundle } from '../types.js';

export class HarnessOptimizer {
  compact(bundle: InstructionBundle): InstructionBundle {
    return {
      ...bundle,
      messages: bundle.messages.map((message) => ({
        ...message,
        content: message.content.replace(/\n{3,}/g, '\n\n').trim(),
      })),
      files: bundle.files.map((file) => ({
        ...file,
        content: file.content.replace(/\n{3,}/g, '\n\n').trim(),
      })),
    };
  }
}