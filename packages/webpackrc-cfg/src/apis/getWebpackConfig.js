// 参考 https://github.com/crlang/easy-webpack-4/blob/master/webpack.config.js
import path from 'path';
import { existsSync } from 'fs';
import { config } from './config';
// import { installDependencies } from './installDependencies';
import WebpackConfig from './WebpackConfig';
import { createCtx, getFiles, getDirs } from '../utils';

const { EslintLoader, BabelLoader, TsLoader, RawLoader, UrlLoader, CssLoader, 
  PostcssLoader, LessLoader, MiniCssExtractLoader } = WebpackConfig.loaders;
const { MiniCssExtractPlugin, DefinePlugin, HtmlWebpackPlugin, OccurrenceOrderPlugin, 
  HotModuleReplacementPlugin, CleanWebpackPlugin, Webpackbar, CopyWebpackPlugin, 
  UglifyjsWebpackPlugin, OptimizeCssAssetsWebpackPlugin } = WebpackConfig.plugins;

// 创建 loader, plugin 实例
const eslintLoader = new EslintLoader();
const babelLoader = new BabelLoader();
const rawLoader = new RawLoader();
const urlLoader = new UrlLoader();
const cssLoader = new CssLoader();
const postcssLoader = new PostcssLoader();
const lessLoader = new LessLoader();
const tsLoader = new TsLoader();
const miniCssExtractLoader = new MiniCssExtractLoader()

// 创建 plugin 实例
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
const friendlyErrorsWebpackPlugin = new WebpackConfig.plugins.FriendlyErrorsWebpackPlugin();

/**
 * 基础配置
 * @param {WebpackConfig} webpackConfig WebpackConfig 实例
 * @param {object} options 选项
 * @param {object} context 上下文
 */
function applyBasic(webpackConfig, options, context){
  let { mode, folders, entry = {}, output = {}, publicPath, resolve = {}, alias, devtool, 
    externals, target, compress = true, common = 'common', splitChunksOptions = {}, 
    runtimeChunk } = options;
  let { cwd, realPaths: { app, src }, paths: { dist } } = context;

  if ( entry ){
    Object.keys(entry).map(key => {
      entry[key] = path.resolve(app, entry[key]);
    });
  };
  if ( mode !== 'production' ){
    entry.webpackHotDevClient = require.resolve('react-dev-utils/webpackHotDevClient');
  };

  if ( alias ){
    Object.keys(alias).map(key => {
      alias[key] = path.resolve(app, alias[key]);
    });
  } else {
    alias = {};
  };

  alias = {
    ...getDirs(src),
    ...alias
  };

  webpackConfig.mode = mode || 'development';
  webpackConfig.context = cwd;
  webpackConfig.entry = {...getFiles(src), ...entry};
  webpackConfig.output =  {
    path: `./${dist}`,
    filename: folders && folders.js ? `${folders.js}/[name].js` : '[name].js',
    chunkFilename: folders && folders.js ? `${folders.js}/[name].js` : '[name].js',
    publicPath: mode === 'production' ? publicPath || './' : '/',
    ...output,
  };
  webpackConfig.resolve = {
    extensions: [ '.web.js', '.js', '.jsx', '.ts', '.tsx', '.json' ],
    ...resolve,
    alias
  };
  webpackConfig.devtool = mode !== 'production' ? devtool || 'source-map' : false;
  if ( mode !== 'production' ) webpackConfig.watch = true;
  webpackConfig.optimization = {
    ...(mode !== 'production' || !compress ? {} : {
      minimizer: [
        uglifyjsWebpackPlugin.getPlugin({
          cache: true,
          parallel: true
        }), 
        optimizeCssAssetsWebpackPlugin.getPlugin({})
      ]
    }),
    minimize: mode === 'production' && compress ? true : false,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: folders && folders.style ? `${folders.style}/${common}` : common,
          test: /\.(css|less|scss|sass)$/,
          chunks: 'all',
          priority: 20,
          ...splitChunksOptions
        },
        js: {
          name: folders && folders.js ? `${folders.js}/${common}` : common,
          test: /\.js$/,
          chunks: 'all',
          priority: -20,
          ...splitChunksOptions
        }
      }
    },
    ...(mode === 'production' && runtimeChunk ? {
      runtimeChunk: 'single'
    } : { })
  };
  if ( externals ) webpackConfig.externals = externals;
  if ( target ) webpackConfig.target = target;
}

/**
 * 加载器配置
 * @param {WebpackConfig} webpackConfig WebpackConfig 实例
 * @param {object} options 选项
 * @param {object} context 上下文
 */
function applyRules(webpackConfig, options, context){
  const { folders, rules = [], module = {} } = options;
  const { eslint, babel = {}, ts = {}, css = {}, img = {}, font = {} } = module;

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
    options: urlLoader.getOptions({
      name: folders && folders.img ? `${folders.img}/[hash].[ext]` : '[hash].[ext]',
      ...img
    })
  }, {
    test: /\.(eot|woff|woff2|webfont|ttf|svg)\?*.*$/,
    loader: urlLoader.module,
    options: urlLoader.getOptions({
      name: folders && folders.font ? `${folders.font}/[hash].[ext]` : '[hash].[ext]',
      ...font
    })
  },{
    test: /\.less$/,
    loader: [miniCssExtractLoader.module, {
      loader: cssLoader.module, 
      options: cssLoader.getOptions({
        ...css,
        importLoaders: 2
      })
    }, {
      loader: postcssLoader.module, 
      options: postcssLoader.options 
    }, lessLoader.module]
  }, {
    test: /\.css$/,
    loader: [miniCssExtractLoader.module, { 
      loader: cssLoader.module, 
      options: cssLoader.getOptions({
        ...css,
        importLoaders: 1
      })
    }, {
      loader: postcssLoader.module, 
      options: postcssLoader.options
    }]
  }, ...rules];
};

/**
 * 插件配置
 * @param {WebpackConfig} webpackConfig WebpackConfig 实例
 * @param {object} options 选项
 * @param {object} context 上下文
 */
function applyPlugins(webpackConfig, options, context){
  const { mode, folders, template, common = 'common' } = options;
  const { realPaths: { app, src, dist, assets } } = context;

  let htmls = getFiles(template ? path.resolve(src, template) : src, /\.html$|\.ejs$/);

  webpackConfig.plugins = [
    definePlugin.getPlugin({
      'process.env.NODE_ENV': mode === 'production' ? '"production"' : '"development"'
    }),
    // html-webpack-plugin 支持使用 ejs 模板
    ...Object.keys(htmls).map(fileName => {
      return htmlWebpackPlugin.getPlugin({
        filename: folders && folders.html ? 
          `${folders.html}/${fileName}.html` : `${fileName}.html`,
        template: htmls[fileName],
        chunks: [ fileName, common ],
        showErrors: true
      })
    }),
    occurrenceOrderPlugin.getPlugin(),
    mode !== 'production' ? hotModuleReplacementPlugin.getPlugin() : undefined,
    miniCssExtractPlugin.getPlugin({
      filename: folders && folders.style ? `${folders.style}/[name].css` :  "[name].css"
    }),
    mode === 'production' ? cleanWebpackPlugin.getPlugin([dist], {
      root: app
    }) : undefined,
    mode === 'production' && existsSync(assets) ? copyWebpackPlugin.getPlugin([{          
      from: assets,
      to: dist
    }]) : undefined,
    // mode === 'production' && devtool ? sourceMapDevToolPlugin.getPlugin() : undefined,
    webpackbar.getPlugin(),
    friendlyErrorsWebpackPlugin.getPlugin()
  ].filter(plugin => !!plugin);
}

/**
 * 获取 webpack 配置
 * @param {object} opts 选项
 * @param {object} context 上下文
 * @return {object} webpack 配置
 */
export default async function getWebpackConfig(
  opts = { mode: 'production' }, 
  context, 
  // installMode
){
  const { ...options } = opts;
  const { npm, cwd, paths } = context;
  const ctx = createCtx(paths, cwd);

  config({
    npm: npm || 'npm',
    cwd
  });

  // 安装依赖
  // await installDependencies(installMode);

  // 生成 webpack 配置
  let webpackConfig = new WebpackConfig();
  applyBasic(webpackConfig, options, ctx);
  applyRules(webpackConfig, options, ctx);
  applyPlugins(webpackConfig, options, ctx);

  return webpackConfig.options;
};