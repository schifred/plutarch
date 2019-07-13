"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

var _config = require("./apis/config");

var _WebpackConfig = _interopRequireDefault(require("./apis/WebpackConfig"));

var _getWebpackConfig = _interopRequireDefault(require("./apis/getWebpackConfig"));

var _installDependencies = require("./apis/installDependencies");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  webpack: _webpack.default,
  config: _config.config,
  WebpackConfig: _WebpackConfig.default,
  getWebpackConfig: _getWebpackConfig.default,
  installDependencies: _installDependencies.installDependencies,
  install: _installDependencies.install
};
exports.default = _default;
module.exports = exports.default;