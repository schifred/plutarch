import path from 'path';
import Command from 'common-bin';
import * as constants from '../constants';

class ServerCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {
      cwd: {
        type: 'string',
        description: 'process cwd'
      },
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
    const forkNodeArgv = this.helper.unparseArgv(argv);

    this.helper.forkNode(runCompilePath, forkNodeArgv, {
      cwd: argv.cwd || cwd,
      env: {
        // 避免深度嵌套的子进程丢失 process.env 信息
        ...process.env,
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
