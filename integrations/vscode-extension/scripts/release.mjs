import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const extensionRoot = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(extensionRoot, '../..');
const action = process.argv[2] ?? 'package';

if (action !== 'package' && action !== 'publish') {
  throw new Error(`Unsupported action: ${action}`);
}

const packagePath = path.join(extensionRoot, 'package.json');
const originalManifest = JSON.parse(await readFile(packagePath, 'utf8'));
const publisher = process.env.NEXUS_VSCE_PUBLISHER?.trim() || originalManifest.publisher;

if (!publisher) {
  throw new Error('Missing publisher. Set NEXUS_VSCE_PUBLISHER or define publisher in package.json.');
}

const stageDir = await mkdtemp(path.join(os.tmpdir(), 'nexus-vscode-release-'));
const stagedExtensionRoot = path.join(stageDir, 'extension');
await mkdir(stagedExtensionRoot, { recursive: true });

for (const entry of ['dist', 'README.md', 'CHANGELOG.md', 'LICENSE']) {
  await cp(path.join(extensionRoot, entry), path.join(stagedExtensionRoot, entry), { recursive: true });
}

const stagedManifest = {
  ...originalManifest,
  publisher,
};

await writeFile(path.join(stagedExtensionRoot, 'package.json'), `${JSON.stringify(stagedManifest, null, 2)}\n`, 'utf8');

const localVsce = path.join(
  extensionRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'vsce.cmd' : 'vsce',
);

const workspaceVsce = path.join(
  workspaceRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'vsce.cmd' : 'vsce',
);

const vsceCommand = existsSync(localVsce) ? localVsce : workspaceVsce;

try {
  if (action === 'package') {
    const artifactDir = path.join(workspaceRoot, 'artifacts');
    await mkdir(artifactDir, { recursive: true });
    const output = path.join(artifactDir, `nexus-design-agi-${publisher}.vsix`);

    execFileSync(vsceCommand, ['package', '--allow-missing-repository', '--out', output], {
      cwd: stagedExtensionRoot,
      stdio: 'inherit',
      env: process.env,
    });
  } else {
    if (!process.env.VSCE_PAT) {
      throw new Error('VSCE_PAT is required for publish.');
    }

    execFileSync(vsceCommand, ['publish', '--allow-missing-repository'], {
      cwd: stagedExtensionRoot,
      stdio: 'inherit',
      env: process.env,
    });
  }
} finally {
  await rm(stageDir, { recursive: true, force: true });
}