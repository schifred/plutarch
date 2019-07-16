"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWebpackConfig;

var _path = _interopRequireDefault(require("path"));

var _fs = require("fs");

var _config = require("./config");

var _WebpackConfig = _interopRequireDefault(require("./WebpackConfig"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  EslintLoader,
  BabelLoader,
  TsLoader,
  RawLoader,
  UrlLoader,
  CssLoader,
  PostcssLoader,
  LessLoader,
  MiniCssExtractLoader
} = _WebpackConfig.default.loaders;
const {
  MiniCssExtractPlugin,
  DefinePlugin,
  HtmlWebpackPlugin,
  OccurrenceOrderPlugin,
  HotModuleReplacementPlugin,
  CleanWebpackPlugin,
  Webpackbar,
  CopyWebpackPlugin,
  UglifyjsWebpackPlugin,
  OptimizeCssAssetsWebpackPlugin
} = _WebpackConfig.default.plugins; // 创建 loader, plugin 实例

const eslintLoader = new EslintLoader();
const babelLoader = new BabelLoader();
const rawLoader = new RawLoader();
const urlLoader = new UrlLoader();
const cssLoader = new CssLoader();
const postcssLoader = new PostcssLoader();
const lessLoader = new LessLoader();
const tsLoader = new TsLoader();
const miniCssExtractLoader = new MiniCssExtractLoader(); // 创建 plugin 实例

const miniCssExtractPlugin = new MiniCssExtractPlugin();
const definePlugin = new DefinePlugin();
const htmlWebpackPlugin = new HtmlWebpackPlugin();
const occurrenceOrderPlugin = new OccurrenceOrderPlugin();
const hotModuleReplacementPlugin = new HotModuleReplacementPlugin();
const cleanWebpackPlugin = new CleanWebpackPlugin();
const webpackbar = new Webpackbar();
const copyWebpackPlugin = new CopyWebpackPlugin();
const uglifyjsWebpackPlugin = new UglifyjsWebpackPlugin();
const optimizeCssAssetsWebpackPlugin = new OptimizeCssAssetsWebpackPlugin();
const friendlyErrorsWebpackPlugin = new _WebpackConfig.default.plugins.FriendlyErrorsWebpackPlugin();
/**
 * 基础配置
 * @param {WebpackConfig} webpackConfig WebpackConfig 实例
 * @param {object} options 选项
 * @param {object} context 上下文
 */

function applyBasic(webpackConfig, options, context) {
  let {
    mode,
    folders,
    entry = {},
    output = {},
    publicPath,
    resolve = {},
    alias,
    devtool,
    externals,
    target,
    compress = true,
    common = 'common',
    splitChunksOptions = {},
    uglifyjsOptions
  } = options;
  let {
    cwd,
    realPaths: {
      app,
      src
    },
    paths: {
      dist
    }
  } = context;

  if (entry) {
    Object.keys(entry).map(key => {
      entry[key] = _path.default.resolve(app, entry[key]);
    });
  }

  ;

  if (mode !== 'production') {
    entry.webpackHotDevClient = require.resolve('react-dev-utils/webpackHotDevClient');
  }

  ;

  if (alias) {
    Object.keys(alias).map(key => {
      alias[key] = _path.default.resolve(app, alias[key]);
    });
  } else {
    alias = {};
  }

  ;
  alias = _objectSpread({}, (0, _utils.getDirs)(src), {}, alias);
  webpackConfig.mode = mode || 'development';
  webpackConfig.context = cwd;
  webpackConfig.entry = _objectSpread({}, (0, _utils.getFiles)(src), {}, entry);
  webpackConfig.output = _objectSpread({
    path: `./${dist}`,
    filename: folders && folders.js ? `${folders.js}/[name].js` : '[name].js',
    chunkFilename: folders && folders.js ? `${folders.js}/[name].[hash].js` : '[name].[hash].js',
    publicPath: mode === 'production' ? publicPath || './' : '/'
  }, output);
  webpackConfig.resolve = _objectSpread({
    extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx', '.json']
  }, resolve, {
    alias
  });
  webpackConfig.devtool = mode !== 'production' ? devtool || 'source-map' : false;
  if (mode !== 'production') webpackConfig.watch = true;
  webpackConfig.optimization = _objectSpread({}, mode !== 'production' || !compress ? {} : {
    minimizer: [uglifyjsWebpackPlugin.getPlugin(_objectSpread({
      cache: true,
      parallel: true
    }, uglifyjsOptions || {})), optimizeCssAssetsWebpackPlugin.getPlugin({})]
  }, {
    minimize: mode === 'production' && compress ? true : false,
    splitChunks: {
      cacheGroups: {
        styles: _objectSpread({
          name: folders && folders.style ? `${folders.style}/${common}` : common,
          test: /\.(css|less|scss|sass)$/,
          chunks: 'all',
          minChunks: 2,
          priority: 20
        }, splitChunksOptions),
        js: _objectSpread({
          name: folders && folders.js ? `${folders.js}/${common}` : common,
          test: /\.js$/,
          chunks: 'all',
          minChunks: 2,
          priority: -20
        }, splitChunksOptions)
      }
    },
    runtimeChunk: false
  });
  if (externals) webpackConfig.externals = externals;
  if (target) webpackConfig.target = target;
}
/**
 * 加载器配置
 * @param {WebpackConfig} webpackConfig WebpackConfig 实例
 * @param {object} options 选项
 * @param {object} context 上下文
 */


function applyRules(webpackConfig, options, context) {
  const {
    folders,
    rules = [],
    module = {}
  } = options;
  const {
    eslint,
    babel = {},
    ts = {},
    css = {},
    img = {},
    font = {}
  } = module;
  webpackConfig.rules = [{
    test: /\.(js|jsx|mjs)$/,
    loader: [{
      loader: babelLoader.module,
      options: babelLoader.getOptions(babel)
    }, eslint ? {
      loader: eslintLoader.module,
      options: eslintLoader.getOptions(typeof eslint === 'object' ? eslint : {})
    } : undefined].filter(loader => !!loader),
    exclude: [/node_modules/]
  }, {
    test: /\.(ts|tsx)$/,
    loader: [{
      loader: babelLoader.module,
      options: babelLoader.getOptions(babel)
    }, {
      loader: tsLoader.module,
      options: tsLoader.getOptions(ts)
    }, eslint ? {
      loader: eslintLoader.module,
      options: eslintLoader.getOptions(typeof eslint === 'object' ? eslint : {})
    } : undefined].filter(loader => !!loader)
  }, {
    test: /\.html$/,
    loader: rawLoader.module
  }, {
    test: /\.(png|jpg|gif)\?*.*$/,
    loader: urlLoader.module,
    options: urlLoader.getOptions(_objectSpread({
      name: folders && folders.img ? `${folders.img}/[hash].[ext]` : '[hash].[ext]'
    }, img))
  }, {
    test: /\.(eot|woff|woff2|webfont|ttf|svg)\?*.*$/,
    loader: urlLoader.module,
    options: urlLoader.getOptions(_objectSpread({
      name: folders && folders.font ? `${folders.font}/[hash].[ext]` : '[hash].[ext]'
    }, font))
  }, {
    test: /\.less$/,
    loader: [miniCssExtractLoader.module, {
      loader: cssLoader.module,
      options: cssLoader.getOptions(_objectSpread({}, css, {
        importLoaders: 2
      }))
    }, {
      loader: postcssLoader.module,
      options: postcssLoader.options
    }, lessLoader.module]
  }, {
    test: /\.css$/,
    loader: [miniCssExtractLoader.module, {
      loader: cssLoader.module,
      options: cssLoader.getOptions(_objectSpread({}, css, {
        importLoaders: 1
      }))
    }, {
      loader: postcssLoader.module,
      options: postcssLoader.options
    }]
  }, ...rules];
}

;
/**
 * 插件配置
 * @param {WebpackConfig} webpackConfig WebpackConfig 实例
 * @param {object} options 选项
 * @param {object} context 上下文
 */

function applyPlugins(webpackConfig, options, context) {
  const {
    mode,
    folders,
    template,
    common = 'common'
  } = options;
  const {
    realPaths: {
      app,
      src,
      dist,
      assets
    }
  } = context;
  let htmls = (0, _utils.getFiles)(template ? _path.default.resolve(src, template) : src, /\.html$|\.ejs$/);
  webpackConfig.plugins = [definePlugin.getPlugin({
    'process.env.NODE_ENV': mode === 'production' ? '"production"' : '"development"'
  }), // html-webpack-plugin 支持使用 ejs 模板
  ...Object.keys(htmls).map(fileName => {
    return htmlWebpackPlugin.getPlugin({
      filename: folders && folders.html ? `${folders.html}/${fileName}.html` : `${fileName}.html`,
      template: htmls[fileName],
      chunks: [fileName, common],
      showErrors: true
    });
  }), occurrenceOrderPlugin.getPlugin(), mode !== 'production' ? hotModuleReplacementPlugin.getPlugin() : undefined, // mini-css-extract-plugin 插件排序问题
  // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250
  miniCssExtractPlugin.getPlugin({
    filename: folders && folders.style ? `${folders.style}/[name].css` : "[name].css"
  }), mode === 'production' ? cleanWebpackPlugin.getPlugin([dist], {
    root: app
  }) : undefined, mode === 'production' && (0, _fs.existsSync)(assets) ? copyWebpackPlugin.getPlugin([{
    from: assets,
    to: dist
  }]) : undefined, // mode === 'production' && devtool ? sourceMapDevToolPlugin.getPlugin() : undefined,
  webpackbar.getPlugin(), friendlyErrorsWebpackPlugin.getPlugin()].filter(plugin => !!plugin);
}
/**
 * 获取 webpack 配置
 * @param {object} opts 选项
 * @param {object} context 上下文
 * @return {object} webpack 配置
 */


function getWebpackConfig() {
  return _getWebpackConfig.apply(this, arguments);
}

function _getWebpackConfig() {
  _getWebpackConfig = _asyncToGenerator(function* (opts = {
    mode: 'production'
  }, context) // installMode
  {
    const options = _extends({}, opts);

    const {
      npm,
      cwd,
      paths
    } = context;
    const ctx = (0, _utils.createCtx)(paths, cwd);
    (0, _config.config)({
      npm: npm || 'npm',
      cwd
    }); // 生成 webpack 配置

    let webpackConfig = new _WebpackConfig.default();
    applyBasic(webpackConfig, options, ctx);
    applyRules(webpackConfig, options, ctx);
    applyPlugins(webpackConfig, options, ctx);
    return webpackConfig.options;
  });
  return _getWebpackConfig.apply(this, arguments);
}

;
module.exports = exports.default;