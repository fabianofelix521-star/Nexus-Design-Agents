import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import type { AdapterTarget, DesignBrief, DesignOutput, InstructionBundle } from '@nexus/core';

export function parseArgMap(argv: string[]): Map<string, string> {
  const pairs = new Map<string, string>();

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (!current || !current.startsWith('--')) {
      continue;
    }

    const next = argv[index + 1];
    pairs.set(current.slice(2), next && !next.startsWith('--') ? next : 'true');
  }

  return pairs;
}

export async function loadBrief(briefPath: string): Promise<DesignBrief> {
  const raw = await readFile(briefPath, 'utf8');
  return JSON.parse(raw) as DesignBrief;
}

export async function ensureDirectory(targetDir: string): Promise<void> {
  await mkdir(targetDir, { recursive: true });
}

export async function writeJson(filePath: string, data: unknown): Promise<void> {
  await ensureDirectory(path.dirname(filePath));
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

export async function writeText(filePath: string, content: string): Promise<void> {
  await ensureDirectory(path.dirname(filePath));
  await writeFile(filePath, `${content.trimEnd()}\n`, 'utf8');
}

export function getTarget(option: string | undefined): AdapterTarget {
  const target = option ?? 'generic-json';
  const supported: AdapterTarget[] = [
    'vscode',
    'cursor',
    'windsurf',
    'antigravity',
    'openclaw',
    'hermes-agent',
    'generic-json',
  ];

  if (!supported.includes(target as AdapterTarget)) {
    throw new Error(`Unsupported target: ${target}`);
  }

  return target as AdapterTarget;
}

export function getOutputDir(map: Map<string, string>): string {
  return map.get('output') ?? 'dist/nexus';
}

export function findInstructionBundle(output: DesignOutput): InstructionBundle | Record<string, unknown> {
  const content = output.artifacts.find((artifact) => artifact.kind === 'instruction-bundle')?.content;

  if (!content || typeof content !== 'object') {
    return {};
  }

  const candidate = content as {
    bundle?: unknown;
  };

  if (candidate.bundle && typeof candidate.bundle === 'object') {
    return candidate.bundle as InstructionBundle;
  }

  return content as Record<string, unknown>;
}

export function extractPalette(output: DesignOutput): {
  ink: string;
  canvas: string;
  accent: string;
  support: string;
} {
  const colorArtifact = output.artifacts.find((artifact) => artifact.id === 'color-system');

  const readColor = (key: string, fallback: string): string => {
    const candidate = colorArtifact?.content[key];
    return typeof candidate === 'string' ? candidate : fallback;
  };

  return {
    ink: readColor('ink', 'oklch(18% 0.03 255)'),
    canvas: readColor('canvas', 'oklch(97% 0.01 95)'),
    accent: readColor('accent', 'oklch(64% 0.18 196)'),
    support: readColor('support', 'oklch(80% 0.05 210)'),
  };
}