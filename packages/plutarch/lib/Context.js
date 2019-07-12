'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require('fs');

var _path = require('path');

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 上下文相关
 */
let Context = class Context {
  constructor() {
    this.getProcessArgv();
    this.getCommandArgv();
    this.getPaths();
  }

  /**
   * 参数相关
   */
  getProcessArgv() {
    const { cwd, platform, env: { NODE_ENV, environment } } = process;

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
    const { argv = {} } = _yargs2.default;
    const { src = 'src', dist = 'dist', assets = 'assets', config = _constants.PlutarchConfigPath,
      server = _constants.ServerPath, mock = _constants.MockPath, mocks = _constants.MocksPath, configs = _constants.ConfigsPath } = argv;

    this.argv = _extends({
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
    const { env, argv } = this;
    const { cwd, environment } = env;
    const { src, dist, assets, config, server, mock, mocks, configs } = argv;

    console.log(environment);

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
};
;

exports.default = Context;
module.exports = exports.default;