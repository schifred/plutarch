"use strict";

const Command = require('common-bin');
const path = require('path');

class ServerCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {
      watch: {
        type: 'boolean',
        default: false,
        alias: "w",
        description: 'watch'
      },
    };
  }

  * run({ cwd, env, argv, rawArgv }) {
    const runPublicPath = path.join(__dirname, "../src/runPublic.js");
    const { watch } = argv;
    const forkNodeArgv = this.helper.unparseArgv({watch});
    this.helper.forkNode(runPublicPath,[ forkNodeArgv ],{
      cwd: cwd,
    });
  }

  get description() {
    return 'build app';
  }
}

module.exports = ServerCommand;
