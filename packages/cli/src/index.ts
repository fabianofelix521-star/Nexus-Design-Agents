#!/usr/bin/env node

import { runDesignCommand } from './commands/design.js';
import { runExportCommand } from './commands/export.js';
import { runInitCommand } from './commands/init.js';

async function main(): Promise<void> {
  const [command = 'help', ...rest] = process.argv.slice(2);

  switch (command) {
    case 'init':
      await runInitCommand(rest);
      break;
    case 'design':
      await runDesignCommand(rest);
      break;
    case 'export':
      await runExportCommand(rest);
      break;
    default:
      process.stdout.write(
        [
          'Nexus CLI',
          '',
          'Commands:',
          '  nexus init [directory]',
          '  nexus design --brief .nexus/brief.example.json --target vscode --output dist/nexus',
          '  nexus export --brief .nexus/brief.example.json --target cursor --output dist/nexus',
        ].join('\n'),
      );
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});