import * as vscode from 'vscode';

import { registerExportSurfaceCommand } from './commands/exportSurface.js';
import { registerGenerateBundleCommand } from './commands/generateBundle.js';
import { registerReviewBriefCommand } from './commands/reviewBrief.js';

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(registerGenerateBundleCommand(context));
  context.subscriptions.push(registerExportSurfaceCommand(context));
  context.subscriptions.push(registerReviewBriefCommand(context));
}

export function deactivate(): void {}