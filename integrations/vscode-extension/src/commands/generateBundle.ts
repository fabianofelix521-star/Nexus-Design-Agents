import * as vscode from 'vscode';

import { generateBundleArtifacts } from '../runtime/generateArtifacts.js';
import { readBrief, pickOutputDirectory, pickTarget, resolveBriefUri } from '../utils/brief.js';
import { PreviewPanel } from '../webviews/PreviewPanel.js';

export function registerGenerateBundleCommand(
  _context: vscode.ExtensionContext,
): vscode.Disposable {
  return vscode.commands.registerCommand('nexus.generateBundle', async (resource?: vscode.Uri) => {
    try {
      const briefUri = await resolveBriefUri(resource);
      if (!briefUri) {
        return;
      }

      const [brief, target, outputDir] = await Promise.all([
        readBrief(briefUri),
        pickTarget('vscode'),
        pickOutputDirectory(),
      ]);

      if (!target || !outputDir) {
        return;
      }

      const result = await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: 'Nexus is generating an instruction bundle',
        },
        () => generateBundleArtifacts(brief, target, outputDir),
      );

      PreviewPanel.show({
        title: 'Nexus Bundle Preview',
        output: result.output,
        writtenFiles: result.writtenFiles,
      });

      void vscode.window.showInformationMessage(`Nexus bundle written to ${outputDir}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      void vscode.window.showErrorMessage(`Nexus bundle generation failed: ${message}`);
    }
  });
}