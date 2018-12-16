import path from 'path';
import { existsSync } from 'fs';
import { config, WebpackConfig, installDependency } from 'webpackrc-cfg';
import { getFiles, getDirs } from './index';

const { BabelLoader, JsonLoader, RawLoader, UrlLoader, StyleLoader, 
  CssLoader, PostcssLoader, LessLoader, FastSassLoader } = WebpackConfig.loaders;

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

// 创建 plugin 实例
const { ExtractTextWebpackPlugin, EnvironmentPlugin, SplitChunksPlugin, 
  HtmlWebpackPlugin, OccurrenceOrderPlugin, HotModuleReplacementPlugin,
  CleanWebpackPlugin, CopyWebpackPlugin } = WebpackConfig.plugins;

const cssExtractPlugin = new ExtractTextWebpackPlugin();
const environmentPlugin = new EnvironmentPlugin();
const splitChunksPlugin = new SplitChunksPlugin();
const htmlWebpackPlugin = new HtmlWebpackPlugin();
const occurrenceOrderPlugin = new OccurrenceOrderPlugin();
const hotModuleReplacementPlugin = new HotModuleReplacementPlugin();
const cleanWebpackPlugin = new CleanWebpackPlugin();
const copyWebpackPlugin = new CopyWebpackPlugin();

function applyBasic(webpackConfig, options, context){
  let { mode, entry, output, resolve, alias, devtool, externals, target } = options;
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
    publicPath: '/'
  };
  webpackConfig.resolve = resolve ? { alias, ...resolve } : {
    extensions: [ '.web.js', '.js', '.jsx', '.tsx', '.json' ],
    alias
  };
  webpackConfig.devtool = mode === 'production' ? undefined : devtool || 'source-map';
  webpackConfig.watch = mode !== 'production' ? true : false;
  webpackConfig.optimization = {
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    minimize: mode === 'production' ? true : false
  };
  if ( externals ) webpackConfig.externals = externals;
  if ( target ) webpackConfig.target = target;
}

function applyRules(webpackConfig, options, context){
  const { mode, rules = [], module = {} } = options;
  const { babel = {}, css = {} } = module;

  webpackConfig.rules = [{
    test: /\.(js|jsx|mjs)$/,
    loader: babelLoader.module,
    options: babelLoader.getOptions(babel),
    exclude: [/node_modules/]
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
    loader: mode === 'production' ? cssExtractPlugin.Plugin.extract({
      fallback: 'style-loader',
      use: [{
        loader: cssLoader.module, 
        options: cssLoader.options
      }, {
        loader: postcssLoader.module, 
        options: postcssLoader.options 
      }, {
        loader: lessLoader.module, 
        options: lessLoader.options 
      }]
    }) : [{ 
      loader: styleLoader.module, 
      options: styleLoader.options 
    }, {
      loader: cssLoader.module, 
      options: cssLoader.options
    }, {
      loader: postcssLoader.module, 
      options: postcssLoader.options 
    }, {
      loader: lessLoader.module, 
      options: lessLoader.options 
    }]
  }, {
    test: /\.(scss|sass)$/,
    loader: mode === 'production' ? cssExtractPlugin.Plugin.extract({
      fallback: 'style-loader',
      use: [{
        loader: cssLoader.module, 
        options: cssLoader.getOptions(css) 
      }, {
        loader: postcssLoader.module, 
        options: postcssLoader.options 
      }, {
        loader: fastSassLoader.module, 
        options: fastSassLoader.options 
      }]
    }) : [{ 
      loader: styleLoader.module, 
      options: styleLoader.options 
    }, {
      loader: cssLoader.module, 
      options: cssLoader.getOptions(css) 
    }, {
      loader: postcssLoader.module, 
      options: postcssLoader.options 
    }, {
      loader: fastSassLoader.module, 
      options: fastSassLoader.options 
    }]
  }, {
    test: /\.css$/,
    loader: mode === 'production' ? cssExtractPlugin.Plugin.extract({
      fallback: 'style-loader',
      use: [{ 
        loader: cssLoader.module, 
        options: cssLoader.getOptions(css) 
      }, {
        loader: postcssLoader.module, 
        options: postcssLoader.options 
      }]
    }) : [{ 
      loader: styleLoader.module, 
      options: styleLoader.options 
    }, { 
      loader: cssLoader.module, 
      options: cssLoader.getOptions(css) 
    }, {
      loader: postcssLoader.module, 
      options: postcssLoader.options 
    }]
  }, ...rules];
};

function applyPlugins(webpackConfig, options, context){
  const { mode } = options;
  const { env: { cwd }, paths: { app, src, dist, assets, nodeModules }, argv } = context;

  let htmls = getFiles(src, /\.html$|\.ejs$/);

  webpackConfig.plugins = [
    // environmentPlugin.getPlugin({
    //   'process.env.NODE_ENV': mode === 'production' ? '"production"' : '"development"'
    // }),
    splitChunksPlugin.getPlugin({          
      name: 'common',
      minChunks: function (module) {// 提供的公共模块需要在 node_modules 目录中
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    ...Object.keys(htmls).map(fileName => {
      return htmlWebpackPlugin.getPlugin({
        title: fileName,
        showErrors: true,
        template: htmls[fileName]
      })
    }),
    occurrenceOrderPlugin.getPlugin(),
    mode !== 'production' ? hotModuleReplacementPlugin.getPlugin() : undefined,
    mode === 'production' ? cssExtractPlugin.getPlugin("common.css") : undefined,
    mode === 'production' ? cleanWebpackPlugin.getPlugin(argv.dist) : undefined,
    mode === 'production' && existsSync(assets) ? copyWebpackPlugin.getPlugin([{          
      from: assets,
      to: dist
    }]) : undefined,
  ].filter(plugin => !!plugin);
}

// installDependency();

export default async function getWebpackConfig(opts, context, mode){
  let { npm, ...options } = opts;
  let { entry, output, module: moduleOption, devtool, resolve, alias, target, externals } = options;
  let { env: { cwd }, paths: { src, app } } = context;

  config({
    npm: npm || 'cnpm'
  });

  if ( typeof mode === 'boolean' && mode ){
    mode = 'production';
  } else if ( !mode ){
    mode = 'development';
  };

  // 完成 webpack 配置
  let webpackConfig = new WebpackConfig();

  applyBasic(webpackConfig, { ...options, mode }, context);
  applyRules(webpackConfig, { ...options, mode }, context);
  applyPlugins(webpackConfig, { ...options, mode }, context);

  return webpackConfig.options;
};