import path from 'path';
import fs from 'fs';
import Command from 'common-bin';
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
      debug: {
        type: 'boolean',
        default: false,
        description: 'build without compress'
      },
      dist: {
        type: 'string',
        default: 'dist',
        alias: 'd',
        description: 'dist'
      }
    };
  }

  * run({ cwd, env, argv, rawArgv }) {
    const runCompilePath = require.resolve("../exec/compile.js");
    const forkNodeArgv = this.helper.unparseArgv({
      ...argv,
      config: fs.existsSync(path.resolve(cwd, constants.ProdConfigPath)) ? 
        constants.ProdConfigPath : constants.PlutarchConfigPath
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
