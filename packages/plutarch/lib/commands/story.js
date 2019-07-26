"use strict";

var _path = _interopRequireDefault(require("path"));

var _commonBin = _interopRequireDefault(require("common-bin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class StoryCommand extends _commonBin.default {
  constructor(rawArgv) {
    super(rawArgv);
    this.options = {
      cwd: {
        type: 'string',
        description: 'process cwd'
      },
      port: {
        type: 'number',
        default: 8001,
        alias: 'p',
        description: 'story server port'
      },
      config: {
        type: 'string',
        default: '.storybook',
        alias: 'c',
        description: 'config'
      },
      output: {
        type: 'string',
        default: 'docs',
        alias: 'o',
        description: 'output'
      },
      npm: {
        type: 'string',
        default: 'npm',
        alias: 'n',
        description: 'npm'
      },
      build: {
        type: 'boolean',
        default: false,
        alias: 'b',
        description: 'build'
      }
    };
  }

  *run({
    cwd,
    env,
    argv,
    rawArgv
  }) {
    const runStoryPath = require.resolve("../exec/story.js");

    const forkNodeArgv = this.helper.unparseArgv(argv);
    console.log(111);
    this.helper.forkNode(runStoryPath, forkNodeArgv, _objectSpread({}, argv, {
      cwd: argv.cwd || cwd,
      env: {
        "NODE_ENV": "development",
        environment: argv.build ? 'prod' : 'dev',
        "TMPDIR": _path.default.resolve(cwd, '.tmpdir')
      }
    }));
  }

  get description() {
    return 'storybook';
  }

}

;
module.exports = StoryCommand;