import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../..');
const outDir = path.join(__dirname, 'out');
const cliEntry = path.join(workspaceRoot, 'packages/cli/dist/index.js');
const briefPath = path.join(__dirname, 'brief.json');

await mkdir(outDir, { recursive: true });

execFileSync(process.execPath, [cliEntry, 'export', '--brief', briefPath, '--target', 'hermes-agent', '--output', outDir], {
  cwd: workspaceRoot,
  stdio: 'inherit',
});

const { RuntimeAdapterRegistry } = await import(pathToFileURL(path.join(workspaceRoot, 'packages/core/dist/index.js')).href);
const bundle = JSON.parse(await readFile(path.join(outDir, 'instruction-bundle.json'), 'utf8'));
const adapter = new RuntimeAdapterRegistry().resolve('hermes-agent');

if (!adapter) {
  throw new Error('Hermes adapter was not registered.');
}

const handshake = {
  request: adapter.createHandshake(bundle),
  response: adapter.negotiate(bundle, ['multi-agent', 'tool-use', 'long-context']),
};

await writeFile(path.join(outDir, 'handshake-result.json'), `${JSON.stringify(handshake, null, 2)}\n`, 'utf8');
process.stdout.write(`Hermes runtime demo written to ${outDir}\n`);