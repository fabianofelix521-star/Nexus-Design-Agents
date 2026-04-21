export type DesignChannel = 'web' | 'mobile' | 'desktop' | 'spatial' | 'agent-runtime';

export type AgentPriority = 1 | 2 | 3;

export type AdapterTarget =
  | 'vscode'
  | 'cursor'
  | 'windsurf'
  | 'antigravity'
  | 'openclaw'
  | 'hermes-agent'
  | 'generic-json';

export type RuntimeCapability =
  | 'tool-use'
  | 'streaming'
  | 'multi-agent'
  | 'code-editing'
  | 'plan-management'
  | 'long-context';

export type RuntimeTransportMode = 'file' | 'stdin' | 'json-rpc' | 'http';

export type RuntimePayloadFormat = 'json' | 'yaml';

export interface DesignConstraint {
  name: string;
  description: string;
  severity: 'hard' | 'soft';
}

export interface DesignBrief {
  projectName: string;
  objective: string;
  audience: string[];
  channels: DesignChannel[];
  constraints: DesignConstraint[];
  moods: string[];
  targetFramework: string;
  targetRuntimes: string[];
}

export interface DesignDecision {
  title: string;
  reasoning: string;
  confidence: number;
  source: string;
}

export interface DesignArtifact {
  id: string;
  kind: 'instruction-bundle' | 'design-token-set' | 'component-spec' | 'workflow';
  title: string;
  content: Record<string, unknown>;
  tags: string[];
}

export interface DesignOutput {
  brief: DesignBrief;
  strategySummary: string;
  decisions: DesignDecision[];
  artifacts: DesignArtifact[];
}

export interface GovernanceIssue {
  severity: 'info' | 'warning' | 'error';
  message: string;
}

export interface AgentSelection {
  agent: string;
  priority: AgentPriority;
}

export interface AgentTask {
  id: string;
  brief: DesignBrief;
  objective: string;
  input: Record<string, unknown>;
}

export interface AgentResult {
  agent: string;
  summary: string;
  artifacts: DesignArtifact[];
  decisions: DesignDecision[];
}

export interface AgentContext {
  sharedState: Map<string, unknown>;
  selections: AgentSelection[];
}

export interface AgentProfile {
  name: string;
  role: string;
  capabilities: string[];
  priorityBias: AgentPriority;
}

export interface AgentBlueprint extends AgentProfile {
  targetSignals: string[];
}

export interface DesignElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  weight: number;
  contrast: number;
  motion?: number;
  semanticRole: 'headline' | 'cta' | 'body' | 'media' | 'navigation' | 'supporting';
}

export interface LayoutSpec {
  width: number;
  height: number;
  elements: DesignElement[];
}

export interface Point {
  x: number;
  y: number;
  size: number;
  height: number;
  score: number;
  reason: string;
}

export interface BezierCurve {
  start: { x: number; y: number };
  control: { x: number; y: number };
  end: { x: number; y: number };
}

export interface HierarchyNode {
  elementId: string;
  level: number;
  score: number;
}

export interface HeatmapData {
  intensity: number[];
}

export interface VisualSalienceMap {
  hotspots: Point[];
  flowPath: BezierCurve[];
  hierarchyLevels: HierarchyNode[];
  attentionPrediction: HeatmapData;
}

export interface SalienceScore {
  score: number;
  reason: string;
}

export interface InstructionMessage {
  role: 'system' | 'developer' | 'user';
  content: string;
}

export interface InstructionFile {
  path: string;
  content: string;
}

export interface InstructionBundle {
  target: AdapterTarget;
  messages: InstructionMessage[];
  files: InstructionFile[];
  metadata: {
    selectedAgents: string[];
    capabilities: RuntimeCapability[];
    framework: string;
  };
}

export interface RuntimeAdapterDescriptor {
  target: AdapterTarget;
  displayName: string;
  protocolVersion: string;
  entryFile: string;
  transport: {
    mode: RuntimeTransportMode;
    payload: RuntimePayloadFormat;
  };
  capabilities: RuntimeCapability[];
  handshake: {
    requestType: string;
    responseType: string;
    requiresAck: boolean;
    supportedArtifacts: string[];
  };
}

export interface RuntimeHandshakeRequest {
  target: AdapterTarget;
  protocolVersion: string;
  entryFile: string;
  bundleCapabilities: RuntimeCapability[];
  selectedAgents: string[];
  framework: string;
}

export interface RuntimeHandshakeResponse {
  target: AdapterTarget;
  accepted: boolean;
  protocolVersion: string;
  agreedCapabilities: RuntimeCapability[];
  missingCapabilities: RuntimeCapability[];
  entryFile: string;
}

export interface ConsensusDecision {
  summary: string;
  decisions: DesignDecision[];
}

export interface LLMModelProfile {
  provider: string;
  defaultModel: string;
  capabilities: RuntimeCapability[];
}

export interface LLMInvocation {
  provider: string;
  model: string;
  payload: Record<string, unknown>;
}