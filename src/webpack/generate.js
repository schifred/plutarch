// 参考 https://github.com/crlang/easy-webpack-4/blob/master/webpack.config.js
import path from 'path';
import { existsSync } from 'fs';
import { config, WebpackConfig, installDependency } from 'webpackrc-cfg';
import { getFiles, getDirs } from '../utils';

const { BabelLoader, TsLoader, JsonLoader, RawLoader, UrlLoader, StyleLoader, 
  CssLoader, PostcssLoader, LessLoader, FastSassLoader, MiniCssExtractLoader } = WebpackConfig.loaders;
const { ExtractTextWebpackPlugin, MiniCssExtractPlugin, DefinePlugin, SplitChunksPlugin, 
  HtmlWebpackPlugin, OccurrenceOrderPlugin, HotModuleReplacementPlugin,
  CleanWebpackPlugin, CopyWebpackPlugin, UglifyjsWebpackPlugin, OptimizeCssAssetsWebpackPlugin } = WebpackConfig.plugins;

// 创建 loader, plugin 实例
const babelLoader = new BabelLoader();
const jsonLoader = new JsonLoader();
const rawLoader = new RawLoader();
const urlLoader = new UrlLoader();
const styleLoader = new StyleLoader();
const cssLoader = new CssLoader();
const postcssLoader = new PostcssLoader();
const lessLoader = new LessLoader();
const fastSassLoader = new FastSassLoader();
const tsLoader = new TsLoader();
const miniCssExtractLoader = new MiniCssExtractLoader()

// 创建 plugin 实例
const miniCssExtractPlugin = new MiniCssExtractPlugin();
const cssExtractPlugin = new ExtractTextWebpackPlugin();
const definePlugin = new DefinePlugin();
const splitChunksPlugin = new SplitChunksPlugin();
const htmlWebpackPlugin = new HtmlWebpackPlugin();
const occurrenceOrderPlugin = new OccurrenceOrderPlugin();
const hotModuleReplacementPlugin = new HotModuleReplacementPlugin();
const cleanWebpackPlugin = new CleanWebpackPlugin();
const copyWebpackPlugin = new CopyWebpackPlugin();
const uglifyjsWebpackPlugin = new UglifyjsWebpackPlugin();
const optimizeCssAssetsWebpackPlugin = new OptimizeCssAssetsWebpackPlugin();

// 安装依赖
// installDependency();

/**
 * 基础配置
 * @param {WebpackConfig} webpackConfig WebpackConfig 实例
 * @param {object} options 选项
 * @param {object} context 上下文
 */
function applyBasic(webpackConfig, options, context){
  let { mode, entry, output, resolve, alias, devtool, externals, target, publicPath } = options;
  let { env: { cwd }, paths: { app, src }, argv: { dist } } = context;

  if ( entry ){
    Object.keys(entry).map(key => {
      entry[key] = path.resolve(app, entry[key]);
    });
  }

  if ( alias ){
    Object.keys(alias).map(key => {
      alias[key] = path.resolve(app, alias[key]);
    });
  } else {
    alias = getDirs(src);
  };

  webpackConfig.mode = mode || 'development';
  webpackConfig.context = cwd;
  webpackConfig.entry = entry || getFiles(src);
  webpackConfig.output = output || {
    path: `./${dist}`,
    filename: '[name].js',
    publicPath: mode === 'production' ? publicPath || './' : '/'
  };
  webpackConfig.resolve = resolve ? { alias, ...resolve } : {
    extensions: [ '.web.js', '.js', '.jsx', '.tsx', '.json' ],
    alias
  };
  webpackConfig.devtool = devtool ? devtool : mode !== 'production' ? 'source-map' : undefined;
  if ( mode !== 'production' ) webpackConfig.watch = true;
  webpackConfig.optimization = {
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    minimize: false,
    ...(mode !== 'production' ? {} : {
      minimizer: [
        uglifyjsWebpackPlugin.getPlugin({
          cache: true,
          parallel: true,
          sourceMap: devtool ? true : false
        }), 
        optimizeCssAssetsWebpackPlugin.getPlugin({})
      ]
    }),
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'common',
          test: /\.css$/,
          chunks: 'all',
          minChunks: 2
        },
        js: {
          name: 'common',
          test: /\.js$/,
          chunks: 'all',
          minChunks: 2
        }
      }
    }
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
  const { rules = [], module = {} } = options;
  const { babel = {}, ts = {}, css = {} } = module;

  webpackConfig.rules = [{
    test: /\.(js|jsx|mjs)$/,
    loader: babelLoader.module,
    options: babelLoader.getOptions(babel),
    exclude: [/node_modules/]
  }, {
    test: /\.(ts|tsx)$/,
    loader: [{
      loader: babelLoader.module,
      options: babelLoader.getOptions(babel)
    }, {
      loader: tsLoader.module,
      options: tsLoader.getOptions(ts)
    }]
  }, {
    test: /\.json$/,
    loader: jsonLoader.module
  }, {
    test: /\.html$/,
    loader: rawLoader.module
  }, {
    test: /\.(png|jpg|gif)\?*.*$/,
    loader: urlLoader.module,
    options: urlLoader.options
  }, {
    test: /\.(eot|woff|woff2|webfont|ttf|svg)\?*.*$/,
    loader: urlLoader.module,
    options: urlLoader.options
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
    test: /\.(scss|sass)$/,
    loader: [miniCssExtractLoader.module, {
      loader: cssLoader.module, 
      options: cssLoader.getOptions({
        ...css,
        importLoaders: 2
      })
    }, {
      loader: postcssLoader.module, 
      options: postcssLoader.options 
    }, fastSassLoader.module]
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
  const { mode } = options;
  const { env: { cwd }, paths: { app, src, dist, assets, nodeModules } } = context;

  let htmls = getFiles(src, /\.html$|\.ejs$/);

  webpackConfig.plugins = [
    definePlugin.getPlugin({
      'process.env.NODE_ENV': mode === 'production' ? '"production"' : '"development"'
    }),
    mode === 'production' ? splitChunksPlugin.getPlugin({          
      name: 'common',
      minChunks: function (module) {// 提供的公共模块需要在 node_modules 目录中
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }) : undefined,
    ...Object.keys(htmls).map(fileName => {
      return htmlWebpackPlugin.getPlugin({
        title: fileName,
        showErrors: true,
        template: htmls[fileName]
      })
    }),
    occurrenceOrderPlugin.getPlugin(),
    mode !== 'production' ? hotModuleReplacementPlugin.getPlugin() : undefined,
    miniCssExtractPlugin.getPlugin({
      filename: "[name].css"
    }),
    mode === 'production' ? cleanWebpackPlugin.getPlugin([dist], {
      root: app
    }) : undefined,
    mode === 'production' && existsSync(assets) ? copyWebpackPlugin.getPlugin([{          
      from: assets,
      to: dist
    }]) : undefined,
  ].filter(plugin => !!plugin);
}

/**
 * 获取 webpack 配置
 * @param {object} opts 选项
 * @param {object} context 上下文
 * @return {object} webpack 配置
 */
export default async function getWebpackConfig(opts, context){
  const { npm, ...options } = opts;

  // config({
  //   npm: npm || 'cnpm'
  // });

  // 生成 webpack 配置
  let webpackConfig = new WebpackConfig();
  applyBasic(webpackConfig, options, context);
  applyRules(webpackConfig, options, context);
  applyPlugins(webpackConfig, options, context);

  return webpackConfig.options;
};