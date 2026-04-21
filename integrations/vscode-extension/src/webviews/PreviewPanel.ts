import * as vscode from 'vscode';

import type { DesignOutput } from '@nexus/core';

export interface PreviewPanelModel {
  title: string;
  output: DesignOutput;
  writtenFiles?: string[];
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export class PreviewPanel {
  static show(model: PreviewPanelModel): void {
    const panel = vscode.window.createWebviewPanel(
      'nexusPreview',
      model.title,
      vscode.ViewColumn.Beside,
      {
        enableScripts: false,
      },
    );

    panel.webview.html = this.render(model);
  }

  private static render(model: PreviewPanelModel): string {
    const decisions = model.output.decisions
      .map(
        (decision) => `
          <article class="card">
            <h3>${escapeHtml(decision.title)}</h3>
            <p>${escapeHtml(decision.reasoning)}</p>
            <small>${escapeHtml(decision.source)} • confidence ${decision.confidence.toFixed(2)}</small>
          </article>`,
      )
      .join('');

    const artifacts = model.output.artifacts
      .map(
        (artifact) => `
          <li>
            <strong>${escapeHtml(artifact.title)}</strong>
            <span>${escapeHtml(artifact.kind)}</span>
          </li>`,
      )
      .join('');

    const writtenFiles = (model.writtenFiles ?? [])
      .map((file) => `<li>${escapeHtml(file)}</li>`)
      .join('');

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      :root {
        color-scheme: light dark;
        font-family: ui-sans-serif, system-ui, sans-serif;
      }

      body {
        margin: 0;
        padding: 24px;
        background: radial-gradient(circle at top left, rgba(73, 103, 255, 0.16), transparent 35%),
          radial-gradient(circle at bottom right, rgba(255, 128, 64, 0.14), transparent 28%);
      }

      main {
        display: grid;
        gap: 20px;
      }

      section {
        background: rgba(20, 20, 24, 0.78);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 18px;
        backdrop-filter: blur(12px);
      }

      .cards {
        display: grid;
        gap: 12px;
      }

      .card {
        padding: 14px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.04);
      }

      ul {
        margin: 0;
        padding-left: 18px;
      }

      h1,
      h2,
      h3,
      p {
        margin-top: 0;
      }

      small,
      span {
        color: rgba(255, 255, 255, 0.72);
      }
    </style>
  </head>
  <body>
    <main>
      <section>
        <h1>${escapeHtml(model.output.brief.projectName)}</h1>
        <p>${escapeHtml(model.output.strategySummary)}</p>
      </section>
      <section>
        <h2>Decisions</h2>
        <div class="cards">${decisions}</div>
      </section>
      <section>
        <h2>Artifacts</h2>
        <ul>${artifacts}</ul>
      </section>
      ${writtenFiles ? `<section><h2>Written Files</h2><ul>${writtenFiles}</ul></section>` : ''}
    </main>
  </body>
</html>`;
  }
}