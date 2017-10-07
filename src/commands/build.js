"use strict";

const Command = require('common-bin');
import * as constants from '../constants';

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
      config: {
        type: 'string',
        default: constants.PlutarchConfigPath,
        alias: 'c',
        description: 'plutarch config filePath'
      },
      clean: {
        type: 'boolean',
        default: false,
        description: 'clean dists'
      },
      debug: {
        type: 'boolean',
        default: false,
        description: 'build without compress'
      }
    };
  }

  * run({ cwd, env, argv, rawArgv }) {
    const runBuildPath = require.resolve("../exec/runBuild.js");
    const forkNodeArgv = this.helper.unparseArgv({
      ...argv, 
      env: 'prod'
    });

    this.helper.forkNode(runBuildPath, forkNodeArgv, { cwd });
  }

  get description() {
    return 'build';
  }
};

module.exports = BuildCommand;
