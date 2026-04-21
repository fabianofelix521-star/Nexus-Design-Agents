import * as vscode from 'vscode';

import { reviewBrief } from '../runtime/generateArtifacts.js';
import { readBrief, resolveBriefUri } from '../utils/brief.js';
import { PreviewPanel } from '../webviews/PreviewPanel.js';

export function registerReviewBriefCommand(
  _context: vscode.ExtensionContext,
): vscode.Disposable {
  return vscode.commands.registerCommand('nexus.reviewBrief', async (resource?: vscode.Uri) => {
    try {
      const briefUri = await resolveBriefUri(resource);
      if (!briefUri) {
        return;
      }

      const brief = await readBrief(briefUri);
      const output = await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: 'Nexus is reviewing the brief',
        },
        () => reviewBrief(brief),
      );

      PreviewPanel.show({
        title: 'Nexus Brief Review',
        output,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      void vscode.window.showErrorMessage(`Nexus brief review failed: ${message}`);
    }
  });
}