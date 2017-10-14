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
    const runBuildPath = require.resolve("../exec/runInit.js");
    const forkNodeArgv = this.helper.unparseArgv({
      ...argv
    });

    this.helper.forkNode(runBuildPath, forkNodeArgv, { cwd });
  }

  get description() {
    return 'choose type to initialize project';
  }
};

module.exports = InitCommand;
