"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CleanWebpackPlugin = _interopRequireDefault(require("./CleanWebpackPlugin"));

var _CopyWebpackPlugin = _interopRequireDefault(require("./CopyWebpackPlugin"));

var _DefinePlugin = _interopRequireDefault(require("./DefinePlugin"));

var _DllPlugin = _interopRequireDefault(require("./DllPlugin"));

var _DLLReferencePlugin = _interopRequireDefault(require("./DLLReferencePlugin"));

var _FriendlyErrorsWebpackPlugin = _interopRequireDefault(require("./FriendlyErrorsWebpackPlugin"));

var _HotModuleReplacementPlugin = _interopRequireDefault(require("./HotModuleReplacementPlugin"));

var _HtmlWebpackPlugin = _interopRequireDefault(require("./HtmlWebpackPlugin"));

var _MiniCssExtractPlugin = _interopRequireDefault(require("./MiniCssExtractPlugin"));

var _OccurrenceOrderPlugin = _interopRequireDefault(require("./OccurrenceOrderPlugin"));

var _OptimizeCssAssetsWebpackPlugin = _interopRequireDefault(require("./OptimizeCssAssetsWebpackPlugin"));

var _SourceMapDevToolPlugin = _interopRequireDefault(require("./SourceMapDevToolPlugin"));

var _UglifyjsWebpackPlugin = _interopRequireDefault(require("./UglifyjsWebpackPlugin"));

var _VmoduleWebpackPlugin = _interopRequireDefault(require("./VmoduleWebpackPlugin"));

var _Webpackbar = _interopRequireDefault(require("./Webpackbar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  CleanWebpackPlugin: _CleanWebpackPlugin.default,
  CopyWebpackPlugin: _CopyWebpackPlugin.default,
  DefinePlugin: _DefinePlugin.default,
  DllPlugin: _DllPlugin.default,
  DLLReferencePlugin: _DLLReferencePlugin.default,
  FriendlyErrorsWebpackPlugin: _FriendlyErrorsWebpackPlugin.default,
  HotModuleReplacementPlugin: _HotModuleReplacementPlugin.default,
  HtmlWebpackPlugin: _HtmlWebpackPlugin.default,
  MiniCssExtractPlugin: _MiniCssExtractPlugin.default,
  OccurrenceOrderPlugin: _OccurrenceOrderPlugin.default,
  OccurrenceOrderPlugin: _OccurrenceOrderPlugin.default,
  OptimizeCssAssetsWebpackPlugin: _OptimizeCssAssetsWebpackPlugin.default,
  SourceMapDevToolPlugin: _SourceMapDevToolPlugin.default,
  UglifyjsWebpackPlugin: _UglifyjsWebpackPlugin.default,
  VmoduleWebpackPlugin: _VmoduleWebpackPlugin.default,
  Webpackbar: _Webpackbar.default
};
exports.default = _default;
module.exports = exports.default;