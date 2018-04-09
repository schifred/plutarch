"use strict";

const Command = require('common-bin');

class PushCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {
      message: {
        type: 'string',
        alias: "m",
        description: 'git commit -m message'
      },
      build: {
        type: 'boolean',
        alias: "b",
        default: false,
        description: 'build'
      }
    };
  }

  * run({ cwd, env, argv, rawArgv }) {
    const runPushPath = require.resolve("../exec/push.js");
    const forkNodeArgv = this.helper.unparseArgv({
      ...argv
    });

    this.helper.forkNode(runPushPath, forkNodeArgv, { cwd });
  }

  get description() {
    return 'git push';
  }
};

module.exports = PushCommand;
