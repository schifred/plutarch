"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _yargs = _interopRequireDefault(require("yargs"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 上下文相关
 */
class Context {
  constructor() {
    this.getProcessArgv();
    this.getCommandArgv();
    this.getPaths();
  }
  /**
   * 参数相关
   */


  getProcessArgv() {
    const {
      cwd,
      platform,
      env: {
        NODE_ENV,
        environment
      }
    } = process;
    this.env = {
      cwd: cwd(),
      platform,
      NODE_ENV,
      environment
    };
    this.isBuild = NODE_ENV === 'production';
  }
  /**
   * 参数相关
   */


  getCommandArgv() {
    const {
      argv = {}
    } = _yargs.default;
    const {
      src = 'src',
      dist = 'dist',
      assets = 'assets',
      config = _constants.PlutarchConfigPath,
      server = _constants.ServerPath,
      mock = _constants.MockPath,
      mocks = _constants.MocksPath,
      configs = _constants.ConfigsPath
    } = argv;
    this.argv = _objectSpread({
      src,
      dist,
      assets,
      config,
      server,
      mock,
      mocks,
      configs
    }, argv);
  }
  /**
   * 路径相关
   */


  getPaths() {
    const {
      env,
      argv
    } = this;
    const {
      cwd,
      environment
    } = env;
    const {
      src,
      dist,
      assets,
      config,
      server,
      mock,
      mocks,
      configs
    } = argv;
    const app = (0, _fs.realpathSync)(cwd);
    this.paths = {
      app,
      src: (0, _path.resolve)(app, src),
      dist: (0, _path.resolve)(app, dist),
      assets: (0, _path.resolve)(app, assets),
      pkg: (0, _path.resolve)(app, 'package.json'),
      tmpdir: (0, _path.resolve)(app, '.tmpdir'),
      localConfig: (0, _path.resolve)(app, `${configs}/local.yaml`),
      envConfig: (0, _path.resolve)(app, `${configs}/${environment}.yaml`),
      nodeModules: (0, _path.resolve)(app, 'node_modules'),
      plrc: (0, _path.resolve)(app, config),
      plsv: (0, _path.resolve)(app, server),
      plmc: (0, _path.resolve)(app, mock),
      plmcs: (0, _path.resolve)(app, mocks),
      cache: (0, _path.resolve)(app, 'node_modules/.cache/babel-loader'),
      devClient: (0, _path.resolve)(__dirname, '../node_modules/react-dev-utils/webpackHotDevClient'),
      buildinNodeModules: (0, _path.resolve)(__dirname, '../node_modules'),
      tpls: (0, _path.resolve)(__dirname, '../tpls')
    };
  }

}

;
var _default = Context;
exports.default = _default;
module.exports = exports.default;