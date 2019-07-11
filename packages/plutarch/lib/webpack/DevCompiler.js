'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _desc, _value, _class;

var _webpackrcCfg = require('webpackrc-cfg');

var _coreDecorators = require('core-decorators');

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _openBrowser = require('react-dev-utils/openBrowser');

var _openBrowser2 = _interopRequireDefault(_openBrowser);

var _WebpackDevServerUtils = require('react-dev-utils/WebpackDevServerUtils');

var _errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');

var _errorOverlayMiddleware2 = _interopRequireDefault(_errorOverlayMiddleware);

var _watch = require('../utils/watch');

var _BaseCompiler = require('./BaseCompiler');

var _BaseCompiler2 = _interopRequireDefault(_BaseCompiler);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _applyMockRoutes = require('../server/applyMockRoutes');

var _applyMockRoutes2 = _interopRequireDefault(_applyMockRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

const defaultHost = '0.0.0.0';

let DevCompiler = (_class = class DevCompiler extends _BaseCompiler2.default {
  constructor(options, context) {
    super(options, context);
    const { plrc, plsv, plmc, plmcs } = this.context.paths;

    // 监听文件变更
    (0, _watch.watch)('plutarch dev', [plrc, plsv, plmc, plmcs]).on('all', () => {
      this.refreshBrowser();
      this.server.close();
      this.run();
    });
  }

  refreshBrowser() {
    if (this.server) {
      this.server.sockWrite(this.server.sockets, 'content-changed');
    };
  }

  run() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const webpackConfig = yield _this.generate('development');
      const compiler = (0, _webpackrcCfg.webpack)(webpackConfig);
      const { context } = _this;
      const { devServer } = _this.options || {};
      const { https, host = defaultHost, port = 3001 } = devServer || {};
      const protocol = https ? 'https' : 'http';
      const urls = (0, _WebpackDevServerUtils.prepareUrls)(protocol, host, port);
      _this.server = new _webpackDevServer2.default(compiler, _extends({
        noInfo: true,
        inline: true, // 处理实时重载的 js 脚本以内联模式插入到页面中
        hot: true, // 模块热替换
        hotOnly: true, // 热替换时，编译失败时是否禁止刷新页面
        quiet: true,
        headers: {
          'access-control-allow-origin': '*'
        }
      }, devServer));

      let isFirstCompile = true;

      // 模拟路由
      (0, _applyMockRoutes2.default)(_this.server.app, context);
      _this.server.use(_errorOverlayMiddleware2.default);

      (0, _WebpackDevServerUtils.choosePort)(host, port).then(function (realPort) {
        compiler.hooks.done.tap('plutarch dev', function (stats) {
          if (stats.hasErrors()) {
            // make sound
            // ref: https://github.com/JannesMeyer/system-bell-webpack-plugin/blob/bb35caf/SystemBellPlugin.js#L14
            if (process.env.SYSTEM_BELL !== 'none') {
              process.stdout.write('\x07');
            }
            return;
          };

          _this.refreshBrowser();

          if (isFirstCompile) {
            let copied;
            try {
              require('clipboardy').writeSync(urls.localUrlForBrowser);
              copied = _logger2.default.dim('(copied to clipboard)', true);
            } catch (e) {
              copied = _logger2.default.red(`(copy to clipboard failed)`, true);
            };

            _logger2.default.log([`  App running at:`, `  - Local:   ${_logger2.default.blue(`${urls.localUrlForTerminal} ${copied}`, true)}`, `  - Network: ${_logger2.default.blue(urls.lanUrlForTerminal, true)}`].join('\n'));

            if ((0, _openBrowser2.default)(urls.localUrlForBrowser)) {
              _logger2.default.log('The browser tab has been opened!');
            };

            isFirstCompile = false;
          };
        });

        _this.server.listen(realPort, host, function (err) {
          if (err) {
            _logger2.default.log(err.stack || err.message);
            return;
          };
        });
      }).catch(function (err) {
        _logger2.default.log(err);
      });

      ['SIGINT', 'SIGTERM'].forEach(function (sig) {
        process.on(sig, function () {
          _this.server.close(function () {
            process.exit(0);
          });
        });
      });
    })();
  }
}, (_applyDecoratedDescriptor(_class.prototype, 'run', [_coreDecorators.override], Object.getOwnPropertyDescriptor(_class.prototype, 'run'), _class.prototype)), _class);
;

exports.default = DevCompiler;
module.exports = exports.default;