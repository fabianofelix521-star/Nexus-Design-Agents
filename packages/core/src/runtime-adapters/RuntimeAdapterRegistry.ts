import type { AdapterTarget } from '../types.js';

import { HermesRuntimeAdapter } from './HermesRuntimeAdapter.js';
import { OpenClawRuntimeAdapter } from './OpenClawRuntimeAdapter.js';
import type { BaseRuntimeAdapter } from './BaseRuntimeAdapter.js';

export class RuntimeAdapterRegistry {
  private readonly adapters = new Map<AdapterTarget, BaseRuntimeAdapter>();

  constructor() {
    this.register(new OpenClawRuntimeAdapter());
    this.register(new HermesRuntimeAdapter());
  }

  register(adapter: BaseRuntimeAdapter): void {
    this.adapters.set(adapter.describe().target, adapter);
  }

  resolve(target: AdapterTarget): BaseRuntimeAdapter | undefined {
    return this.adapters.get(target);
  }

  list(): BaseRuntimeAdapter[] {
    return [...this.adapters.values()];
  }
}