import * as vscode from 'vscode';

import { exportStarterSurface } from '../runtime/generateArtifacts.js';
import { readBrief, pickOutputDirectory, pickTarget, resolveBriefUri } from '../utils/brief.js';
import { PreviewPanel } from '../webviews/PreviewPanel.js';

export function registerExportSurfaceCommand(
  _context: vscode.ExtensionContext,
): vscode.Disposable {
  return vscode.commands.registerCommand('nexus.exportSurface', async (resource?: vscode.Uri) => {
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
          title: 'Nexus is exporting a starter surface',
        },
        () => exportStarterSurface(brief, target, outputDir),
      );

      PreviewPanel.show({
        title: 'Nexus Surface Export',
        output: result.output,
        writtenFiles: result.writtenFiles,
      });

      const componentPath = result.writtenFiles[result.writtenFiles.length - 1];
      if (componentPath) {
        const document = await vscode.workspace.openTextDocument(componentPath);
        await vscode.window.showTextDocument(document, { preview: false });
      }

      void vscode.window.showInformationMessage(`Nexus surface exported to ${outputDir}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      void vscode.window.showErrorMessage(`Nexus surface export failed: ${message}`);
    }
  });
}