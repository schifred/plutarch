"use strict";

const Command = require('common-bin');
const path = require('path');

class ServerCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {
      port: {
        type: 'number',
        default: 3001,
        alias: "p",
        description: 'dev server port'
      },
      host: {
        type: 'string',
        default: '0.0.0.0',
        alias: 'h',
        description: 'dev server host'
      }
    };
  }

  * run({ cwd, env, argv, rawArgv }) {
    const runServerPath = path.join(__dirname, "../src/runServer.js");
    const { port, host } = argv;
    const forkNodeArgv = this.helper.unparseArgv({port});
    this.helper.forkNode(runServerPath,[ forkNodeArgv ],{
      cwd: cwd,
      env: {
        "NODE_ENV": "'development'"
      }
    });
  }

  get description() {
    return 'Create locale';
  }
}

module.exports = ServerCommand;
