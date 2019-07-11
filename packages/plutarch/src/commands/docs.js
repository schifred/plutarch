import path from 'path';
import fs from 'fs';
import Command from 'common-bin';
import * as constants from '../constants';

class DocsCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {
      cwd: {
        type: 'string',
        description: 'process cwd'
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
        description: 'debug'
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
      cwd: argv.cwd || cwd,
      env: {
        "NODE_ENV": "production",
        environment: 'dev',
        "TMPDIR": path.resolve(cwd, '.tmpdir')
      } 
    });
  }

  get description() {
    return 'docs';
  }
};

module.exports = DocsCommand;
