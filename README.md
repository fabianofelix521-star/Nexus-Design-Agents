# Nexus Design AGI

Nexus Design AGI is a portable multi-agent design-engineering runtime for modern AI software. It takes a structured brief, runs a specialist design workflow, and exports host-specific instruction bundles, tokens, and starter components for environments such as VS Code, Cursor, Windsurf, Antigravity, OpenClaw, and Hermes Agent.

## What ships in this repository

- `@nexus/core`: cognitive runtime, specialist agent catalog, orchestration, harness, governance, and provider adapters.
- `@nexus/design-tokens`: OKLCH-first token generators and transformers for CSS, Tailwind v4, and Figma-like variable payloads.
- `@nexus/component-forge`: starter generators and validators for React, Vue, and Svelte surfaces.
- `@nexus/cli`: project bootstrap, design execution, and target export commands.
- `integrations/`: rule files and manifests for target AI software and agent runtimes.

## Quick start

```bash
pnpm install
pnpm --filter @nexus/cli build
node packages/cli/dist/index.js init .
node packages/cli/dist/index.js export --brief .nexus/brief.example.json --target vscode --output dist/nexus
```

## Demo scripts

```bash
pnpm demo:vscode
pnpm demo:openclaw
pnpm demo:hermes
```

Each command builds the workspace first and then writes target-specific demo output under `examples/`.

## Supported targets

- VS Code via `.github/copilot-instructions.md`
- Cursor via `.cursorrules`
- Windsurf via `.windsurfrules`
- Antigravity via `.antigravity/nexus.instructions.md`
- OpenClaw via JSON agent manifest
- Hermes Agent via YAML agent manifest
- Generic JSON bundles for any custom runtime

## Design principles

- Prefer real, composable execution paths over placeholder ontologies.
- Keep exported artifacts deterministic enough for code review and CI.
- Encode accessibility, motion safety, and fallback behavior in the bundle itself.
- Treat portability as a first-class requirement, not a post-processing step.

## Repository map

See [docs/getting-started.md](docs/getting-started.md), [docs/architecture.md](docs/architecture.md), and [docs/agents-reference.md](docs/agents-reference.md) for the primary documentation set.

## Publishing

Public packages are versioned with Changesets and published through the GitHub release workflow. See [docs/publishing.md](docs/publishing.md) for the exact flow and required secrets.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/release-flow.md](docs/release-flow.md) for the local git and branch workflow.