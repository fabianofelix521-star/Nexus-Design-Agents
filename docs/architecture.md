# Architecture

Nexus Design AGI is organized around four layers.

## 1. Cognitive runtime

`@nexus/core` contains the agent catalog, master orchestration, governance, provider adapters, memory, and the harness system that converts design decisions into host-specific instruction bundles.

## 2. Artifact generators

`@nexus/design-tokens` and `@nexus/component-forge` convert strategy into concrete outputs: OKLCH token sets, CSS variables, Tailwind mappings, and starter UI components for multiple frameworks.

## 3. Delivery surfaces

`@nexus/cli` coordinates the end-to-end flow. The `integrations/` directory stores target-specific rule files and runtime manifests that can be copied or generated into host environments.

## 4. Governance and validation

Workflows, validators, and generated artifacts are designed to remain diffable, reviewable, and testable. The design goal is not maximum ontology size. The design goal is a small set of real systems that compose into a larger runtime.