"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _commonBin = _interopRequireDefault(require("common-bin"));

var constants = _interopRequireWildcard(require("../constants"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DevCommand extends _commonBin.default {
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

  *run({
    cwd,
    env,
    argv,
    rawArgv
  }) {
    const runCompilePath = require.resolve("../exec/compile.js");

    const forkNodeArgv = this.helper.unparseArgv(argv);
    this.helper.forkNode(runCompilePath, forkNodeArgv, {
      cwd: argv.cwd || cwd,
      env: {
        "NODE_ENV": "development",
        environment: 'dev',
        "TMPDIR": _path.default.resolve(cwd, '.tmpdir')
      }
    });
  }

  get description() {
    return 'Create dev server';
  }

}

var _default = DevCommand;
exports.default = _default;
module.exports = exports.default;