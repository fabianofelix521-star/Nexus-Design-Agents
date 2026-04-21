# Nexus Design AGI for VS Code

Nexus Design AGI brings the Nexus multi-agent design runtime directly into VS Code.

## Commands

- `Nexus: Generate Instruction Bundle`
- `Nexus: Export Starter Surface`
- `Nexus: Review Brief`

## Expected input

Commands operate on a Nexus brief JSON file. A starter brief can be created from the workspace root with:

```bash
node packages/cli/dist/index.js init .
```

## Local packaging

```bash
pnpm --filter nexus-vscode-extension typecheck
pnpm --filter nexus-vscode-extension build
pnpm --filter nexus-vscode-extension package:vsix
```

The generated VSIX will be written to `artifacts/nexus-design-agi.vsix`.

## Publishing note

The package is configured with the `felix` publisher identifier. Marketplace publication requires a matching publisher account and a valid `VSCE_PAT` token.