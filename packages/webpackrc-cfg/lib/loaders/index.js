'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BabelLoader = require('./BabelLoader');

var _BabelLoader2 = _interopRequireDefault(_BabelLoader);

var _CssLoader = require('./CssLoader');

var _CssLoader2 = _interopRequireDefault(_CssLoader);

var _EslintLoader = require('./EslintLoader');

var _EslintLoader2 = _interopRequireDefault(_EslintLoader);

var _JsonLoader = require('./JsonLoader');

var _JsonLoader2 = _interopRequireDefault(_JsonLoader);

var _LessLoader = require('./LessLoader');

var _LessLoader2 = _interopRequireDefault(_LessLoader);

var _MiniCssExtractLoader = require('./MiniCssExtractLoader');

var _MiniCssExtractLoader2 = _interopRequireDefault(_MiniCssExtractLoader);

var _PostcssLoader = require('./PostcssLoader');

var _PostcssLoader2 = _interopRequireDefault(_PostcssLoader);

var _RawLoader = require('./RawLoader');

var _RawLoader2 = _interopRequireDefault(_RawLoader);

var _StyleLoader = require('./StyleLoader');

var _StyleLoader2 = _interopRequireDefault(_StyleLoader);

var _TsLoader = require('./TsLoader');

var _TsLoader2 = _interopRequireDefault(_TsLoader);

var _UrlLoader = require('./UrlLoader');

var _UrlLoader2 = _interopRequireDefault(_UrlLoader);

var _VueLoader = require('./VueLoader');

var _VueLoader2 = _interopRequireDefault(_VueLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  BabelLoader: _BabelLoader2.default,
  CssLoader: _CssLoader2.default,
  EslintLoader: _EslintLoader2.default,
  JsonLoader: _JsonLoader2.default,
  LessLoader: _LessLoader2.default,
  MiniCssExtractLoader: _MiniCssExtractLoader2.default,
  PostcssLoader: _PostcssLoader2.default,
  RawLoader: _RawLoader2.default,
  StyleLoader: _StyleLoader2.default,
  TsLoader: _TsLoader2.default,
  UrlLoader: _UrlLoader2.default,
  VueLoader: _VueLoader2.default
};
module.exports = exports.default;