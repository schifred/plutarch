"use strict";

const Command = require('common-bin');

class InitCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {
      type: {
        type: 'string',
        default: "dva",
        alias: "t",
        description: 'project type as dva'
      }
    };
  }

  * run({ cwd, env, argv, rawArgv }) {
    const runInitPath = require.resolve("../exec/init.js");
    const forkNodeArgv = this.helper.unparseArgv({
      ...argv
    });

    this.helper.forkNode(runInitPath, forkNodeArgv, { cwd });
  }

  get description() {
    return 'choose type to initialize project';
  }
};

module.exports = InitCommand;
