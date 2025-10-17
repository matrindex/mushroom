#!/usr/bin/env node

import { Command } from 'commander';
import { Forge } from '@open-norantec/forge';
import { Schema } from '@open-norantec/utilities/dist/schema-util.class';

const command = new Command('mushroom');

const handleLog = (level: Schema.LogLevel, message?: string) => {
  console.log(`[${new Date().toISOString()}] [${level}] ${message}`);
  switch (level) {
    case 'error':
      process.exit(1);
    default:
      break;
  }
};

command.addCommand(
  new Command('publish').argument('<entry-file-path>').action(async (entryFilePath: string) => {
    const forge = new Forge({
      afterEmitAction: 'disable-writing',
      mode: 'production',
      workDir: process.cwd(),
      sourceDir: '.',
      entry: entryFilePath,
      // onFile: (content) => {
      //   console.log(content);
      //   fs.writeFileSync('./test.js', content);
      // },
      onLog: handleLog,
    });

    await forge.run();
  }),
);

command.parse(process.argv);
