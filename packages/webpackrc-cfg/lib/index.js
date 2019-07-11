'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _config = require('./apis/config');

var _WebpackConfig = require('./apis/WebpackConfig');

var _WebpackConfig2 = _interopRequireDefault(_WebpackConfig);

var _getWebpackConfig = require('./apis/getWebpackConfig');

var _getWebpackConfig2 = _interopRequireDefault(_getWebpackConfig);

var _installDependencies = require('./apis/installDependencies');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  webpack: _webpack2.default,
  config: _config.config,
  WebpackConfig: _WebpackConfig2.default,
  getWebpackConfig: _getWebpackConfig2.default,
  installDependencies: _installDependencies.installDependencies,
  install: _installDependencies.install
};
module.exports = exports.default;