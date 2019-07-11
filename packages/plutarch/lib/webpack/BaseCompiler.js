'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _path = require('path');

var _fs = require('fs');

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _webpackrcCfg = require('webpackrc-cfg');

var _vmoduleWebpackPlugin = require('vmodule-webpack-plugin');

var _vmoduleWebpackPlugin2 = _interopRequireDefault(_vmoduleWebpackPlugin);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let Compiler = class Compiler extends _events2.default {
  constructor(options, context) {
    super(options, context);
    this.options = options;
    this.context = context;
  }

  /**
   * 生成 webpack 配置
   * @param {string} mode 区分 build, server
   */
  generate(mode = 'production') {
    var _this = this;

    return _asyncToGenerator(function* () {
      const that = _this;
      let { options, context } = _this;
      let webpackConfig;

      // 根据命令切换 mode
      const { env: { NODE_ENV, cwd }, argv, paths } = context;
      const ctx = { cwd, paths: _extends({}, argv) };
      if (NODE_ENV) mode = NODE_ENV;

      let opts = {};
      const localConfigExist = (0, _fs.existsSync)(paths.localConfig);
      const envConfigExist = (0, _fs.existsSync)(paths.envConfig);
      if (localConfigExist || envConfigExist) {
        const vmodulePlugin = new _vmoduleWebpackPlugin2.default({
          name: 'configs',
          handler: function () {
            _rimraf2.default.sync(paths.tmpdir);
            (0, _fs.mkdirSync)(paths.tmpdir);
            const localConfig = localConfigExist ? _jsYaml2.default.load((0, _fs.readFileSync)(paths.localConfig)) : {};
            const envConfig = envConfigExist ? _jsYaml2.default.load((0, _fs.readFileSync)(paths.envConfig)) : {};

            that.refreshBrowser && that.refreshBrowser();

            return _extends({}, localConfig, envConfig);
          },
          watch: ['all']
        });

        opts = {
          alias: _extends({}, options.alias || {}, {
            configs: vmodulePlugin.moduleFile
          }),
          plugins: [...(options.plugins || []), vmodulePlugin]
        };
      };

      if (typeof options === 'object') {
        opts.mode = options.mode || mode;
        webpackConfig = yield (0, _webpackrcCfg.getWebpackConfig)(_extends({}, options, opts), ctx);
      } else if (typeof options === 'function') {
        opts.mode = mode;
        webpackConfig = yield (0, _webpackrcCfg.getWebpackConfig)(opts, ctx);
        webpackConfig = options.call(context, webpackConfig);
      }

      return webpackConfig;
    })();
  }

  /**
   * 运行 webpack
   */
  run() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const { paths } = _this2.context;
      const webpackConfig = yield _this2.generate(true);
      const compiler = (0, _webpackrcCfg.webpack)(webpackConfig);

      _logger2.default.blue(`${_this2.constructor.name} begin to compile`);

      _this2.emit('start');

      compiler.run(function (err, stats) {
        _rimraf2.default.sync(paths.tmpdir);

        if (err) {
          _logger2.default.red('compile failed');
          _this2.emit('failed', err);
          return;
        };

        _logger2.default.blue('compile done');

        _this2.emit('compiled');
      });
    })();
  }
};
;

exports.default = Compiler;
module.exports = exports.default;