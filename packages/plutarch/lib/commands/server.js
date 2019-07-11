'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _commonBin = require('common-bin');

var _commonBin2 = _interopRequireDefault(_commonBin);

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ServerCommand = class ServerCommand extends _commonBin2.default {
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

  *run({ cwd, env, argv, rawArgv }) {
    const runCompilePath = require.resolve("../exec/compile.js");
    const devConfigPath = _fs2.default.existsSync(_path2.default.resolve(cwd, constants.DevConfigPath)) ? constants.DevConfigPath : constants.PlutarchConfigPath;
    const forkNodeArgv = this.helper.unparseArgv(_extends({}, argv, {
      config: devConfigPath
    }));

    this.helper.forkNode(runCompilePath, forkNodeArgv, {
      cwd: argv.cwd || cwd,
      env: {
        "NODE_ENV": "development",
        environment: 'dev',
        "TMPDIR": _path2.default.resolve(cwd, '.tmpdir')
      }
    });
  }

  get description() {
    return 'Create dev server';
  }
};
exports.default = ServerCommand;
module.exports = exports.default;