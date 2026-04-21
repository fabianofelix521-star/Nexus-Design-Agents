import { readFile } from 'node:fs/promises';

import * as vscode from 'vscode';

import type { AdapterTarget, DesignBrief } from '@nexus/core';

const supportedTargets: AdapterTarget[] = [
  'vscode',
  'cursor',
  'windsurf',
  'antigravity',
  'openclaw',
  'hermes-agent',
  'generic-json',
];

function isDesignBrief(value: unknown): value is DesignBrief {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<DesignBrief>;
  return (
    typeof candidate.projectName === 'string' &&
    typeof candidate.objective === 'string' &&
    Array.isArray(candidate.audience) &&
    Array.isArray(candidate.channels) &&
    Array.isArray(candidate.constraints) &&
    Array.isArray(candidate.moods) &&
    typeof candidate.targetFramework === 'string' &&
    Array.isArray(candidate.targetRuntimes)
  );
}

export async function resolveBriefUri(resource?: vscode.Uri): Promise<vscode.Uri | undefined> {
  if (resource) {
    return resource;
  }

  const activeUri = vscode.window.activeTextEditor?.document.uri;
  if (activeUri?.fsPath.endsWith('.json')) {
    return activeUri;
  }

  const selection = await vscode.window.showOpenDialog({
    canSelectFiles: true,
    canSelectFolders: false,
    canSelectMany: false,
    filters: {
      JSON: ['json'],
    },
    openLabel: 'Select Nexus Brief',
  });

  return selection?.[0];
}

export async function readBrief(uri: vscode.Uri): Promise<DesignBrief> {
  const raw = await readFile(uri.fsPath, 'utf8');
  const parsed = JSON.parse(raw) as unknown;

  if (!isDesignBrief(parsed)) {
    throw new Error('Selected file is not a valid Nexus design brief.');
  }

  return parsed;
}

export async function pickTarget(defaultTarget = 'vscode'): Promise<AdapterTarget | undefined> {
  const chosen = await vscode.window.showQuickPick(
    supportedTargets.map((target) => ({
      label: target,
      picked: target === defaultTarget,
    })),
    {
      placeHolder: 'Select the export target',
      title: 'Nexus Export Target',
    },
  );

  return chosen?.label as AdapterTarget | undefined;
}

export async function pickOutputDirectory(): Promise<string | undefined> {
  const workspaceUri = vscode.workspace.workspaceFolders?.[0]?.uri;
  const options: vscode.OpenDialogOptions = {
    canSelectFiles: false,
    canSelectFolders: true,
    canSelectMany: false,
    openLabel: 'Select Export Folder',
  };

  if (workspaceUri) {
    options.defaultUri = workspaceUri;
  }

  const selection = await vscode.window.showOpenDialog(options);

  return selection?.[0]?.fsPath;
}