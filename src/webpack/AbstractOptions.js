import { basename } from 'path';
import { existsSync } from 'fs';
import webpack from 'webpack';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import loaders from './loaders';
import * as helpers from './helpers';

// webpack 选项抽象类
// module.rules 以对象形式呈现，由 getWebpackConfig 方法转化为可注入 webpack 的配置项
class AbstractOptions{
  constructor(context, isBuild = false){
    Object.defineProperty(this, 'context', {
      enumerable: true,
      configurable: false,
      get: () => { return context }
    });

    Object.defineProperty(this, 'isBuild', {
      enumerable: true,
      configurable: false,
      get: () => { return isBuild }
    });

    Object.defineProperty(this, 'defaultLoaders', {
      enumerable: true,
      configurable: false,
      get: () => { return loaders }
    });

    this.loaders = {...loaders};

    Object.defineProperty(this, 'helpers', {
      enumerable: true,
      configurable: false,
      get: () => { return helpers }
    });

    this.config = {};
  }

  validateOpts(opts){}
  
  // 初始化
  init(opts){
    const { mode, context, entry, output, module: mod, resolve: resolveConfig, plugins, devServer, 
      devtool, target, externals, optimization, node, performance, stats } = opts || {};

    this.setMode(mode, opts);
    this.setContext(context, opts);// loader、plugin 查找的相对路径
    this.setEntry(entry, opts);// 配置入口文件
    this.setOutput(output, opts);// 配置输出
    this.setModule(mod, opts);// 配置模块加载器
    this.setResolve(resolveConfig, opts);// 配置解析
    this.setPlugins(plugins, opts);// 配置插件
    this.setDevServer(devServer, opts);// 配置调试服务器
    this.setDevtool(devtool, opts);// 配置影响生成source map的方式
    this.setTarget(target, opts);// 配置构建目标
    this.setExternals(externals, opts);// 声明第三方类库在运行时由外部注入
    this.setOptimization(optimization, opts);
    this.setNode(node, opts);// 由 NodeStuffPlugin 插件以全局变量形式为 'web', 'webworker' 注入类 Node 功能
    this.setPerformance(performance, opts);// 配置性能选项
    this.setStats(stats, opts);// 细粒度控制输出日志
  }

  // 配置簇
  setMode(mode, opts){}
  setContext(context, opts){}
  setEntry(entry, opts){}
  setOutput(output, opts){}
  setModule(mod, opts){}
  setResolve(resolveConfig, opts){}
  setPlugins(plugins, opts){}
  setDevServer(devServer, opts){}
  setDevtool(devtool, opts){}
  setTarget(target, opts){}
  setExternals(externals, opts){}
  setOptimization(optimization, opts){}
  setNode(node, opts){}
  setPerformance(performance, opts){}
  setStats(stats, opts){}

  // 获取默认加载器，对象形式
  convertLoadersToRules(loaders){
    loaders = loaders ? loaders : this.loaders;
    const { context, isBuild } = this;
    const { babelLoader, eslintLoader, tsLoader, styleLoader, cssLoader, postcssLoader, 
      lessLoader, sassLoader, urlLoader, svgSpriteLoader, fileLoader, csvLoader, 
      xmlLoader, htmlLoader } = loaders;
    const { paths: { src, nodeModules } } = context;

    return {
      js: {
        test: /\.jsx?$/,
        include: [ src ],
        use: [ babelLoader.loader, eslintLoader.loader ]
      },
      ts: {
        test: /\.tsx?$/,
        include: [ src ],
        use: [ babelLoader.loader, tsLoader.loader ],
      },
      css: isBuild ? {
        test: /\.css$/,
        include: [ src, nodeModules ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ cssLoader.loaderBuild, postcssLoader.loader ]
        })
      } : {
        test: /\.css$/,
        include: [ src, nodeModules ],
        use: [ styleLoader.loader, cssLoader.loader, postcssLoader.loader ]
      },
      less: isBuild ? {
        test: /\.less$/,
        include: [ src, nodeModules ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ cssLoader.loaderBuild, postcssLoader.loader, lessLoader.loader ]
        })
      } : {
        test: /\.less$/,
        include: [ src, nodeModules ],
        use: [ styleLoader.loader, cssLoader.loader, postcssLoader.loader, lessLoader.loader ]
      },
      sass: isBuild ? {
        test: /\.scss$/,
        include: [ src, nodeModules ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ cssLoader.loaderBuild, postcssLoader.loader, sassLoader.loader ]
        })
      } : {
        test: /\.scss$/,
        include: [ src, nodeModules ],
        use: [ styleLoader.loader, cssLoader.loader, postcssLoader.loader, sassLoader.loader ]
      },
      url: {
        test: /\.(png|jpeg|jpg|gif)$/,
        use: [ urlLoader.loader ]
      },
      file: {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [ fileLoader.loader ]
      },
      csv: {
        test: /\.(csv|tsv)$/,
        use: [ csvLoader.loader ]
      },
      xml: {
        test: /\.xml$/,
        use: [ xmlLoader.loader ]
      },
      html: {
        test: /\.html$/,
        use: [ htmlLoader.loader ]
      },
      svg: {
        test: /\.svg$/,
        use: [ svgSpriteLoader.loader ]
      }
    };
  }

  // 获取默认插件，对象形式
  getDefaultPlugins(){
    const { context, isBuild, helpers } = this;
    const { paths: { app, src, dist, assert, nodeModules } } = context;
    const htmls = helpers.getFiles(src, /\.html$|\.ejs$/);

    const common = {
      // 使用 npm install 加载缺失的模块时，无需重启调试服务器
      // watchMissingNodeModulesPlugin: {
      //   Constructor: WatchMissingNodeModulesPlugin,
      //   args: [nodeModules]
      // },

      // 便捷配置 process.env.NODE_ENV, process.env.DEBUG
      environmentPlugin: {
        Constructor: webpack.EnvironmentPlugin,
        args: [{
          'NODE_ENV': isBuild ? '"production"' : '"development"'
        }]
      },

      // 抽离公共文件
      splitChunksPlugin: {
        Constructor: webpack.optimize.SplitChunksPlugin,
        args: [{
          name: 'common',
          minChunks: function (module) {// 提供的公共模块需要在 node_modules 目录中
            return module.context && module.context.indexOf('node_modules') !== -1;
          }
        }]
      },

      htmlWebpackPlugin: Object.keys(htmls).map(fileName => ({
        Constructor: HtmlWebpackPlugin,
        args: [{
          title: fileName,
          showErrors: true,
          template: htmls[fileName]
        }]
      })),

      occurrenceOrderPlugin: {
        Constructor: webpack.optimize.OccurrenceOrderPlugin,
        args: []
      }
    };

    return isBuild ? {
      ...common,

      cleanWebpackPlugin: {
        Constructor: CleanWebpackPlugin,
        args: [[ basename(dist) ],{
          root: app,
          //dry: false
        }]
      },

      copyWebpackPlugin: existsSync(assert) ? {
        Constructor: CopyWebpackPlugin,
        args: [[{
          from: assert,
          to: dist
        }]]
      } : null,

      extractTextPlugin: {
        Constructor: ExtractTextPlugin,
        args: [{
          filename: `common.css`,// '[name].css'
          allChunks: true,
        }]
      },
    } : {
      ...common,

      // 热替换插件
      hotModuleReplacementPlugin: {
        Constructor: webpack.HotModuleReplacementPlugin,
        args: []
      }
    };
  }

  // 获取 webpack 配置
  getWebpackConfig(config){
    config = config ? config : this.config;

    if ( !Object.keys(config).length ) return {};

    let { module: { rules }, plugins: defaultPlugins } = config;
    let plugins = [];

    rules = Object.keys(rules).map(key => {
      const rule = rules[key];

      return rule;
    });

    Object.keys(defaultPlugins).map(key => {
      const defaultPlugin = defaultPlugins[key];

      if ( !defaultPlugin ) return;

      if ( Array.isArray(defaultPlugin) ){
        plugins = [
          ...plugins, 
          ...defaultPlugin.map(plg => new plg.Constructor(...plg.args))
        ];
      }else{
        plugins.push(new defaultPlugin.Constructor(...defaultPlugin.args));
      };
    });

    return {
      ...config,
      module: {
        rules
      },
      plugins
    };
  }

  // 获取编译器
  getCompiler(){
    const webpackConfig = this.getWebpackConfig();
    const compiler = webpack(webpackConfig);
    return compiler;
  }
};

export default AbstractOptions;
