# Agents Reference

The runtime ships with a 27-agent catalog. A few agents have dedicated implementations, while the rest are represented through a typed specialist profile system so the orchestration layer can stay deterministic and extensible.

## Dedicated implementations

- `MasterDesignAgent`
- `UIArchitectAgent`
- `ColorAlchemistAgent`
- `AccessibilityGuardianAgent`
- `DesignCriticAgent`
- `GenerativeUIAgent`
- `ShaderAlchemistAgent`

## Specialist profile system

Additional catalog entries such as `SpatialDesignAgent`, `HapticDesignAgent`, `DataVisualizationAgent`, `FutureVisionAgent`, and `AgentBridgeAgent` are instantiated through the `SpecialistDesignAgent` base. This keeps the public API stable while allowing targeted implementations to be added without refactoring the orchestrator.