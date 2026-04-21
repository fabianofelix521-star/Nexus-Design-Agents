import { ColorAlchemistAgent } from './ColorAlchemistAgent.js';
import { AccessibilityGuardianAgent } from './AccessibilityGuardianAgent.js';
import { DesignCriticAgent } from './DesignCriticAgent.js';
import { GenerativeUIAgent } from './GenerativeUIAgent.js';
import { ShaderAlchemistAgent } from './ShaderAlchemistAgent.js';
import { SpecialistDesignAgent } from './SpecialistDesignAgent.js';
import { UIArchitectAgent } from './UIArchitectAgent.js';
import { NeuroAestheticEngine } from '../cognitive-engine/NeuroAestheticEngine.js';
import { GovernanceAgent } from '../harness/GovernanceAgent.js';
import { MetaHarness } from '../harness/MetaHarness.js';
import { NaturalLanguageHarness } from '../harness/NaturalLanguageHarness.js';
import { AgentOrchestrator } from '../orchestrator/AgentOrchestrator.js';
import { DesignMemoryBank } from '../memory/DesignMemoryBank.js';
import { agentCatalog } from '../registry/agentCatalog.js';
import type { AdapterTarget, AgentSelection, DesignBrief, DesignOutput } from '../types.js';

interface BriefAnalysis {
  summary: string;
  selections: AgentSelection[];
  novelty: number;
}

export class MasterDesignAgent {
  constructor(
    private readonly cognitiveEngine: NeuroAestheticEngine,
    private readonly orchestrator: AgentOrchestrator,
    private readonly memoryBank: DesignMemoryBank,
    private readonly governance: GovernanceAgent,
    private readonly harness: NaturalLanguageHarness,
    private readonly metaHarness: MetaHarness,
  ) {}

  static createDefault(): MasterDesignAgent {
    const orchestrator = new AgentOrchestrator();
    const dedicatedAgents = [
      new UIArchitectAgent(),
      new ColorAlchemistAgent(),
      new AccessibilityGuardianAgent(),
      new DesignCriticAgent(),
      new ShaderAlchemistAgent(),
      new GenerativeUIAgent(),
    ];

    for (const agent of dedicatedAgents) {
      orchestrator.register(agent);
    }

    for (const blueprint of agentCatalog) {
      if (dedicatedAgents.some((agent) => agent.getProfile().name === blueprint.name)) {
        continue;
      }

      orchestrator.register(new SpecialistDesignAgent(blueprint));
    }

    return new MasterDesignAgent(
      new NeuroAestheticEngine(),
      orchestrator,
      new DesignMemoryBank(),
      new GovernanceAgent(),
      new NaturalLanguageHarness(),
      new MetaHarness(),
    );
  }

  async executeDesign(brief: DesignBrief, target: AdapterTarget = 'generic-json'): Promise<DesignOutput> {
    this.memoryBank.rememberBrief(brief);

    const analysis = this.deepBriefAnalysis(brief);
    const output = await this.orchestrator.executeWorkflow({
      brief,
      objective: brief.objective,
      selections: analysis.selections,
      input: {
        novelty: analysis.novelty,
      },
    });

    const bundle = this.metaHarness.optimize(
      this.harness.compile({
        brief,
        output,
        target,
      }),
    );

    const governance = this.governance.reviewBundle(bundle, brief);

    return {
      brief,
      strategySummary: `${analysis.summary} | ${output.strategySummary}`,
      decisions: [...output.decisions, ...governance.decisions],
      artifacts: [
        ...output.artifacts,
        {
          id: 'instruction-bundle',
          kind: 'instruction-bundle',
          title: `${target} instruction bundle`,
          content: { bundle, issues: governance.issues },
          tags: [target, 'portable', 'agents'],
        },
      ],
    };
  }

  private deepBriefAnalysis(brief: DesignBrief): BriefAnalysis {
    const novelty = this.cognitiveEngine.calculateOptimalNovelty(
      brief.moods.includes('familiar') ? 0.42 : 0.61,
    );

    const selections: AgentSelection[] = [
      { agent: 'UIArchitectAgent', priority: 1 },
      { agent: 'ColorAlchemistAgent', priority: 1 },
      { agent: 'AccessibilityGuardianAgent', priority: 1 },
      { agent: 'DesignCriticAgent', priority: 1 },
      { agent: 'GenerativeUIAgent', priority: 1 },
    ];

    if (brief.channels.includes('spatial') || brief.moods.some((mood) => /cinematic|shader|immersive/i.test(mood))) {
      selections.push({ agent: 'ShaderAlchemistAgent', priority: 1 });
      selections.push({ agent: 'SpatialDesignAgent', priority: 2 });
    }

    if (brief.channels.includes('mobile')) {
      selections.push({ agent: 'HapticDesignAgent', priority: 2 });
    }

    if (brief.channels.includes('agent-runtime')) {
      selections.push({ agent: 'AgentBridgeAgent', priority: 1 });
    }

    return {
      summary: `Novelty target ${novelty.toFixed(2)} for ${brief.targetFramework} across ${brief.channels.join(', ')}`,
      selections,
      novelty,
    };
  }
}