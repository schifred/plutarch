import path from 'path';
import fs from 'fs';
import Command from 'common-bin';
import * as constants from '../constants';

class ServerCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {
      port: {
        type: 'number',
        default: 3001,
        alias: "p",
        description: 'dev server port'
      },
      server: {
        type: 'string',
        default: constants.ServerPath,
        alias: 's',
        description: 'plutarch server file path'
      },
      mock: {
        type: 'string',
        default: constants.MockPath,
        alias: 'm',
        description: 'plutarch mock file path'
      },
      mocks: {
        type: 'string',
        default: constants.MocksPath,
        description: 'plutarch mock directory path'
      },
      dll: {
        type: 'boolean',
        default: false,
        alias: 'd',
        description: 'rebuild mainfest.json'
      }
    };
  }

  * run({ cwd, env, argv, rawArgv }) {
    const runCompilePath = require.resolve("../exec/compile.js");
    const devConfigPath = fs.existsSync(path.resolve(cwd, constants.DevConfigPath)) ? 
      constants.DevConfigPath : constants.PlutarchConfigPath;
    const forkNodeArgv = this.helper.unparseArgv({
      ...argv,
      config: devConfigPath
    });

    this.helper.forkNode(runCompilePath, forkNodeArgv, {
      cwd,
      env: {
        "NODE_ENV": "development",
        environment: 'dev',
        "TMPDIR": path.resolve(cwd, '.tmpdir')
      }
    });
  }

  get description() {
    return 'Create dev server';
  }
}

export default ServerCommand;
