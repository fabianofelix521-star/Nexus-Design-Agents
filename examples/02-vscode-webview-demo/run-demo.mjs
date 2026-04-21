import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../..');
const outDir = path.join(__dirname, 'out');
const cliEntry = path.join(workspaceRoot, 'packages/cli/dist/index.js');
const briefPath = path.join(__dirname, 'brief.json');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

await mkdir(outDir, { recursive: true });

execFileSync(process.execPath, [cliEntry, 'export', '--brief', briefPath, '--target', 'vscode', '--output', outDir], {
  cwd: workspaceRoot,
  stdio: 'inherit',
});

const raw = await readFile(path.join(outDir, 'design-output.json'), 'utf8');
const output = JSON.parse(raw);
const decisions = output.decisions
  .map(
    (decision) => `
      <article class="card">
        <h3>${escapeHtml(decision.title)}</h3>
        <p>${escapeHtml(decision.reasoning)}</p>
        <small>${escapeHtml(decision.source)} | confidence ${decision.confidence.toFixed(2)}</small>
      </article>`,
  )
  .join('');

const artifacts = output.artifacts
  .map((artifact) => `<li><strong>${escapeHtml(artifact.title)}</strong> <span>${escapeHtml(artifact.kind)}</span></li>`)
  .join('');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Nexus VS Code Webview Demo</title>
    <style>
      body {
        margin: 0;
        padding: 32px;
        font-family: ui-sans-serif, system-ui, sans-serif;
        background: linear-gradient(180deg, #111827 0%, #1f2937 100%);
        color: #f9fafb;
      }

      main {
        display: grid;
        gap: 18px;
        max-width: 960px;
        margin: 0 auto;
      }

      section {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 18px;
        background: rgba(15, 23, 42, 0.72);
        padding: 20px;
      }

      .cards {
        display: grid;
        gap: 12px;
      }

      .card {
        background: rgba(255, 255, 255, 0.04);
        border-radius: 14px;
        padding: 14px;
      }

      h1,
      h2,
      h3,
      p {
        margin-top: 0;
      }

      small,
      span {
        color: rgba(255, 255, 255, 0.75);
      }
    </style>
  </head>
  <body>
    <main>
      <section>
        <h1>${escapeHtml(output.brief.projectName)}</h1>
        <p>${escapeHtml(output.strategySummary)}</p>
      </section>
      <section>
        <h2>Decisions</h2>
        <div class="cards">${decisions}</div>
      </section>
      <section>
        <h2>Artifacts</h2>
        <ul>${artifacts}</ul>
      </section>
    </main>
  </body>
</html>`;

await writeFile(path.join(outDir, 'webview-preview.html'), html, 'utf8');
process.stdout.write(`VS Code webview demo written to ${outDir}\n`);