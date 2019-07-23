"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpackrcCfg = require("webpackrc-cfg");

var _coreDecorators = require("core-decorators");

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _openBrowser = _interopRequireDefault(require("react-dev-utils/openBrowser"));

var _WebpackDevServerUtils = require("react-dev-utils/WebpackDevServerUtils");

var _errorOverlayMiddleware = _interopRequireDefault(require("react-dev-utils/errorOverlayMiddleware"));

var _watch = require("../utils/watch");

var _BaseCompiler = _interopRequireDefault(require("./BaseCompiler"));

var _logger = _interopRequireDefault(require("../logger"));

var _applyMockRoutes = _interopRequireDefault(require("../server/applyMockRoutes"));

var _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const defaultHost = '0.0.0.0';
let DevCompiler = (_class = class DevCompiler extends _BaseCompiler.default {
  constructor(options, context) {
    super(options, context);
    const {
      plrc,
      plsv,
      plmc,
      plmcs
    } = this.context.paths; // 监听文件变更

    (0, _watch.watch)('plutarch dev', [plrc, plsv, plmc, plmcs]).on('all', () => {
      this.refreshBrowser();
      this.server.close();
      this.run();
    });
  }

  refreshBrowser() {
    if (this.server) {
      this.server.sockWrite(this.server.sockets, 'content-changed');
    }

    ;
  }

  run() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const webpackConfig = yield _this.generate('development');
      const compiler = (0, _webpackrcCfg.webpack)(webpackConfig);
      const {
        context
      } = _this;
      const {
        devServer = {}
      } = _this.options || {};
      const {
        https,
        host = defaultHost
      } = devServer;
      const port = devServer.port || _this.context.argv.port || 3001;
      const protocol = https ? 'https' : 'http';
      const urls = (0, _WebpackDevServerUtils.prepareUrls)(protocol, host, port);
      _this.server = new _webpackDevServer.default(compiler, _objectSpread({
        noInfo: true,
        inline: true,
        // 处理实时重载的 js 脚本以内联模式插入到页面中
        hot: true,
        // 模块热替换
        hotOnly: true,
        // 热替换时，编译失败时是否禁止刷新页面
        quiet: true,
        headers: {
          'access-control-allow-origin': '*'
        }
      }, devServer));
      let isFirstCompile = true; // 模拟路由

      (0, _applyMockRoutes.default)(_this.server.app, context);

      _this.server.use(_errorOverlayMiddleware.default);

      (0, _WebpackDevServerUtils.choosePort)(host, port).then(realPort => {
        compiler.hooks.done.tap('plutarch dev', stats => {
          if (stats.hasErrors()) {
            // make sound
            // ref: https://github.com/JannesMeyer/system-bell-webpack-plugin/blob/bb35caf/SystemBellPlugin.js#L14
            if (process.env.SYSTEM_BELL !== 'none') {
              process.stdout.write('\x07');
            }

            return;
          }

          ;

          _this.refreshBrowser();

          if (isFirstCompile) {
            let copied;

            try {
              require('clipboardy').writeSync(urls.localUrlForBrowser);

              copied = _logger.default.dim('(copied to clipboard)', true);
            } catch (e) {
              copied = _logger.default.red(`(copy to clipboard failed)`, true);
            }

            ;

            _logger.default.log([`  App running at:`, `  - Local:   ${_logger.default.blue(`${urls.localUrlForTerminal} ${copied}`, true)}`, `  - Network: ${_logger.default.blue(urls.lanUrlForTerminal, true)}`].join('\n'));

            if ((0, _openBrowser.default)(urls.localUrlForBrowser)) {
              _logger.default.log('The browser tab has been opened!');
            }

            ;
            isFirstCompile = false;
          }

          ;
        });

        _this.server.listen(realPort, host, err => {
          if (err) {
            _logger.default.log(err.stack || err.message);

            return;
          }

          ;
        });
      }).catch(err => {
        _logger.default.log(err);
      });
      ['SIGINT', 'SIGTERM'].forEach(sig => {
        process.on(sig, () => {
          _this.server.close(() => {
            process.exit(0);
          });
        });
      });
    })();
  }

}, (_applyDecoratedDescriptor(_class.prototype, "run", [_coreDecorators.override], Object.getOwnPropertyDescriptor(_class.prototype, "run"), _class.prototype)), _class);
;
var _default = DevCompiler;
exports.default = _default;
module.exports = exports.default;