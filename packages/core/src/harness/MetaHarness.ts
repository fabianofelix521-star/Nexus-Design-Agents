import { HarnessOptimizer } from './HarnessOptimizer.js';
import type { InstructionBundle } from '../types.js';

export class MetaHarness {
  constructor(private readonly optimizer = new HarnessOptimizer()) {}

  optimize(bundle: InstructionBundle): InstructionBundle {
    const optimized = this.optimizer.compact(bundle);

    if (optimized.target === 'generic-json') {
      return {
        ...optimized,
        files: optimized.files.map((file) => ({
          ...file,
          content: JSON.stringify(
            {
              target: optimized.target,
              messages: optimized.messages,
              metadata: optimized.metadata,
            },
            null,
            2,
          ),
        })),
      };
    }

    return optimized;
  }
}