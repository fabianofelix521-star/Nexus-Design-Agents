import type { AgentSelection } from '../types.js';

export interface AgentTopology {
  nodes: string[];
  edges: Array<{ from: string; to: string }>;
}

export class AgentTopologyManager {
  build(selections: AgentSelection[]): AgentTopology {
    const ordered = [...selections].sort((left, right) => left.priority - right.priority);

    return {
      nodes: ['MasterDesignAgent', ...ordered.map((selection) => selection.agent)],
      edges: ordered.map((selection) => ({ from: 'MasterDesignAgent', to: selection.agent })),
    };
  }
}