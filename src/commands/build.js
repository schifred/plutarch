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
      debug: {
        type: 'boolean',
        default: false,
        description: 'build without compress'
      }
    };
  }

  * run({ cwd, env, argv, rawArgv }) {
    const runCompilePath = require.resolve("../exec/compile.js");
    const forkNodeArgv = this.helper.unparseArgv({
      ...argv
    });

    this.helper.forkNode(runCompilePath, forkNodeArgv, { 
      cwd,
      env: {
        "NODE_ENV": "production"
      } 
    });
  }

  get description() {
    return 'build';
  }
};

module.exports = BuildCommand;
