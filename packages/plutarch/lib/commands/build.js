"use strict";

var _path = _interopRequireDefault(require("path"));

var _commonBin = _interopRequireDefault(require("common-bin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BuildCommand extends _commonBin.default {
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
      env: _objectSpread({}, process.env, {
        "NODE_ENV": "production",
        environment: argv.pre ? 'pre' : 'prod',
        "TMPDIR": _path.default.resolve(argv.cwd || cwd, '.tmpdir')
      })
    });
  }

  get description() {
    return 'build';
  }

}

;
module.exports = BuildCommand;