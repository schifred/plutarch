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
      h: {
        type: 'string',
        default: '127.0.0.1',
        alias: 'host',
        description: 'dev server host'
      },
      config: {
        type: 'string',
        default: constants.PlutarchConfigPath,
        alias: 'c',
        description: 'plutarch config filePath'
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
    console.log(argv.host)
    const runServerPath = require.resolve("../exec/runServer.js");
    const forkNodeArgv = this.helper.unparseArgv({
      ...argv, 
      env: 'dev'
    });

    this.helper.forkNode(runServerPath, forkNodeArgv, {
      cwd: cwd
      // 设置该属性，npm-install-webpack-plugin报错spawn npm ENOENT
      // env: {
      //   "NODE_ENV": "'development'"
      // }
    });
  }

  get description() {
    return 'Create dev server';
  }
}

export default ServerCommand;
