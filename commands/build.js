"use strict";

const Command = require('common-bin');
const path = require('path');

class BuildCommand extends Command {
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
    const runBuildPath = path.join(__dirname, "../src/runBuild.js");
    const { watch } = argv;
    const forkNodeArgv = this.helper.unparseArgv({watch});
    this.helper.forkNode(runBuildPath,[ forkNodeArgv ],{
      cwd: cwd,
      env: {
        "NODE_ENV": "'production'"
      }
    });
  }

  get description() {
    return 'build app';
  }
}

module.exports = BuildCommand;
