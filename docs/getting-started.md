# Getting Started

1. Install dependencies with `pnpm install`.
2. Build the workspace with `pnpm build`.
3. Initialize a local brief with `node packages/cli/dist/index.js init .`.
4. Edit `.nexus/brief.example.json` to match your project.
5. Run `node packages/cli/dist/index.js export --brief .nexus/brief.example.json --target vscode --output dist/nexus`.

The export step writes a portable instruction bundle, CSS tokens, and a starter component implementation for the selected framework.