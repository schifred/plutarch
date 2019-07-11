'use strict';

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

let BuildCommand = class BuildCommand extends _commonBin2.default {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {
      cwd: {
        type: 'string',
        description: 'process cwd'
      },
      pre: {
        type: 'boolean',
        default: false,
        alias: "p",
        description: 'pre'
      },
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

  *run({ cwd, env, argv, rawArgv }) {
    const runCompilePath = require.resolve("../exec/compile.js");
    const forkNodeArgv = this.helper.unparseArgv(_extends({}, argv, {
      config: argv.pre && _fs2.default.existsSync(_path2.default.resolve(cwd, constants.PreConfigPath)) ? constants.PreConfigPath : _fs2.default.existsSync(_path2.default.resolve(cwd, constants.ProdConfigPath)) ? constants.ProdConfigPath : constants.PlutarchConfigPath
    }));

    this.helper.forkNode(runCompilePath, forkNodeArgv, {
      cwd: argv.cwd || cwd,
      env: {
        "NODE_ENV": "production",
        environment: argv.pre ? 'pre' : 'prod',
        "TMPDIR": _path2.default.resolve(cwd, '.tmpdir')
      }
    });
  }

  get description() {
    return 'build';
  }
};
;

module.exports = BuildCommand;