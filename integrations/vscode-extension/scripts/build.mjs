import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const extensionRoot = path.resolve(__dirname, '..');
const outdir = path.join(extensionRoot, 'dist');
const workspaceRoot = path.resolve(extensionRoot, '../..');

await rm(outdir, { recursive: true, force: true });
await mkdir(outdir, { recursive: true });

await build({
  absWorkingDir: extensionRoot,
  entryPoints: [path.join(extensionRoot, 'src/extension.ts')],
  outfile: path.join(outdir, 'extension.cjs'),
  bundle: true,
  alias: {
    '@nexus/core': path.join(workspaceRoot, 'packages/core/src/index.ts'),
    '@nexus/design-tokens': path.join(workspaceRoot, 'packages/design-tokens/src/index.ts'),
    '@nexus/component-forge': path.join(workspaceRoot, 'packages/component-forge/src/index.ts'),
  },
  format: 'cjs',
  platform: 'node',
  target: 'node20',
  sourcemap: true,
  external: ['vscode'],
  banner: {
    js: '/* Nexus Design AGI VS Code Extension */',
  },
});