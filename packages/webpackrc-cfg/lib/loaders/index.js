"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BabelLoader = _interopRequireDefault(require("./BabelLoader"));

var _CssLoader = _interopRequireDefault(require("./CssLoader"));

var _EslintLoader = _interopRequireDefault(require("./EslintLoader"));

var _JsonLoader = _interopRequireDefault(require("./JsonLoader"));

var _LessLoader = _interopRequireDefault(require("./LessLoader"));

var _MiniCssExtractLoader = _interopRequireDefault(require("./MiniCssExtractLoader"));

var _PostcssLoader = _interopRequireDefault(require("./PostcssLoader"));

var _RawLoader = _interopRequireDefault(require("./RawLoader"));

var _StyleLoader = _interopRequireDefault(require("./StyleLoader"));

var _TsLoader = _interopRequireDefault(require("./TsLoader"));

var _UrlLoader = _interopRequireDefault(require("./UrlLoader"));

var _VueLoader = _interopRequireDefault(require("./VueLoader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  BabelLoader: _BabelLoader.default,
  CssLoader: _CssLoader.default,
  EslintLoader: _EslintLoader.default,
  JsonLoader: _JsonLoader.default,
  LessLoader: _LessLoader.default,
  MiniCssExtractLoader: _MiniCssExtractLoader.default,
  PostcssLoader: _PostcssLoader.default,
  RawLoader: _RawLoader.default,
  StyleLoader: _StyleLoader.default,
  TsLoader: _TsLoader.default,
  UrlLoader: _UrlLoader.default,
  VueLoader: _VueLoader.default
};
exports.default = _default;
module.exports = exports.default;