import path from 'path';
import fs from 'fs';
import Command from 'common-bin';
import * as constants from '../constants';

class DocsCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {
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
      ...argv,
      dist: 'docs',
      config: fs.existsSync(path.resolve(cwd, constants.DevConfigPath)) ? 
        constants.DevConfigPath : constants.PlutarchConfigPath
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

module.exports = DocsCommand;
