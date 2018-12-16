"use strict";

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
      config: {
        type: 'string',
        default: constants.ConfigPath,
        alias: 'c',
        description: 'plutarch config file path'
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
    const forkNodeArgv = this.helper.unparseArgv({
      ...argv
    });

    this.helper.forkNode(runCompilePath, forkNodeArgv, {
      cwd,
      env: {
        "NODE_ENV": "development"
      }
    });
  }

  get description() {
    return 'Create dev server';
  }
}

export default ServerCommand;
