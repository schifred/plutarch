import path from 'path';
import fs from 'fs';
import Command from 'common-bin';
import * as constants from '../constants';

class PreCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {
      cwd: {
        type: 'string',
        description: 'process cwd'
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
      config: argv.pre && fs.existsSync(path.resolve(cwd, constants.PreConfigPath)) ? 
        constants.PreConfigPath : 
        fs.existsSync(path.resolve(cwd, constants.ProdConfigPath)) ? 
        constants.ProdConfigPath : constants.PlutarchConfigPath
    });

    this.helper.forkNode(runCompilePath, forkNodeArgv, { 
      cwd: argv.cwd || cwd,
      env: {
        "NODE_ENV": "production",
        environment: 'prod',
        "TMPDIR": path.resolve(cwd, '.tmpdir')
      } 
    });
  }

  get description() {
    return 'pre';
  }
};

module.exports = PreCommand;
