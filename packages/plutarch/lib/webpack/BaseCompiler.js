"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = _interopRequireDefault(require("events"));

var _path = require("path");

var _fs = require("fs");

var _rimraf = _interopRequireDefault(require("rimraf"));

var _webpackrcCfg = require("webpackrc-cfg");

var _vmoduleWebpackPlugin = _interopRequireDefault(require("vmodule-webpack-plugin"));

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _logger = _interopRequireDefault(require("../logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class Compiler extends _events.default {
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
      let {
        options,
        context
      } = _this;
      let webpackConfig; // 根据命令切换 mode

      const {
        env: {
          NODE_ENV,
          cwd
        },
        argv,
        paths
      } = context;
      const ctx = {
        cwd,
        paths: _objectSpread({}, argv)
      };
      if (NODE_ENV) mode = NODE_ENV;
      let opts = {};
      const localConfigExist = (0, _fs.existsSync)(paths.localConfig);
      const envConfigExist = (0, _fs.existsSync)(paths.envConfig);

      if (localConfigExist || envConfigExist) {
        const vmodulePlugin = new _vmoduleWebpackPlugin.default({
          name: 'configs',
          handler: function () {
            _rimraf.default.sync(paths.tmpdir);

            (0, _fs.mkdirSync)(paths.tmpdir);
            const localConfig = localConfigExist ? _jsYaml.default.load((0, _fs.readFileSync)(paths.localConfig)) : {};
            const envConfig = envConfigExist ? _jsYaml.default.load((0, _fs.readFileSync)(paths.envConfig)) : {};
            that.refreshBrowser && that.refreshBrowser();
            return _objectSpread({}, localConfig, {}, envConfig);
          },
          watch: ['all']
        });
        opts = {
          alias: _objectSpread({}, options.alias || {}, {
            configs: vmodulePlugin.moduleFile
          }),
          plugins: [...(options.plugins || []), vmodulePlugin]
        };
      }

      ;

      if (typeof options === 'object') {
        opts.mode = options.mode || mode;
        webpackConfig = yield (0, _webpackrcCfg.getWebpackConfig)(_objectSpread({}, options, {}, opts), ctx);
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
      const {
        paths
      } = _this2.context;
      const webpackConfig = yield _this2.generate(true);
      const compiler = (0, _webpackrcCfg.webpack)(webpackConfig);

      _logger.default.blue(`${_this2.constructor.name} begin to compile`);

      _this2.emit('start');

      compiler.run((err, stats) => {
        _rimraf.default.sync(paths.tmpdir);

        if (err) {
          _logger.default.red('compile failed');

          _this2.emit('failed', err);

          return;
        }

        ;

        _logger.default.blue('compile done');

        _this2.emit('compiled');
      });
    })();
  }

}

;
var _default = Compiler;
exports.default = _default;
module.exports = exports.default;