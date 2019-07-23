"use strict";

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _commonBin = _interopRequireDefault(require("common-bin"));

var constants = _interopRequireWildcard(require("../constants"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DocsCommand extends _commonBin.default {
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

  *run({
    cwd,
    env,
    argv,
    rawArgv
  }) {
    const runCompilePath = require.resolve("../exec/compile.js");

    const forkNodeArgv = this.helper.unparseArgv(_objectSpread({}, argv, {
      dist: 'docs',
      config: _fs.default.existsSync(_path.default.resolve(cwd, constants.DevConfigPath)) ? constants.DevConfigPath : constants.PlutarchConfigPath
    }));
    this.helper.forkNode(runCompilePath, forkNodeArgv, {
      cwd: argv.cwd || cwd,
      env: {
        "NODE_ENV": "production",
        environment: 'dev',
        "TMPDIR": _path.default.resolve(cwd, '.tmpdir')
      }
    });
  }

  get description() {
    return 'docs';
  }

}

;
module.exports = DocsCommand;