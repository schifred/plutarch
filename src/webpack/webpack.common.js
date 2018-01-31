'use strict';

import debug from 'debug';
import webpack from 'webpack';
import { existsSync } from 'fs';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import NpmInstallPlugin from 'npm-install-webpack-plugin';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';

import { traverseDirectory } from '../utils';
import { BabelOptions, eslintLoader, CssLoadersWithModules, CssLoadersWithoutModules } from '../constants';

const _debug = debug('plutarch');

function getCommonConfig(paths, processArgv, yargsArgv){
  _debug(`get common config`)

  const { env } = yargsArgv;
  const isProd = env==='prod';
  const NODE_ENV = isProd ? "'production'" : "'development'";
  const { appSrcPath, appDistPath, appPublicPath, appNodeModulesPath, ownNodeModulesPath, resolveOwn } 
    = paths;
  const { fileMap: entry, dirMap: alias } = traverseDirectory(appSrcPath);
  const debug = processArgv.NODE_ENV==='test';

  const commonConfig = {
    target: "web",// 打包文件使用平台形势，默认值
    entry: entry,// 入口文件[ string | array | object ]
    context: resolveOwn(''),
    output: {
      path: appDistPath,
      publicPath: "/",
      filename: "[name].js",
      chunkFilename: "[name].async.js",// 非入口文件名，require.ensure异步加载脚本文件
      crossOriginLoading: "anonymous",// 启用跨域加载脚本
      // devtoolLineToLine: false,// 编辑脚本是否启用行到行SourceMap的映射，默认值
      // sourceMapFilename: "[file].map",// SourceMap文件名，默认值
      // hotUpdateChunkFilename: "[id].[hash].hot-update.js",// 热更新加载的文件名，默认值
      // hotUpdateFunction: "webpackHotUpdate",// 热更新加载jsonp函数，默认值
      // hotUpdateMainFilename: "[hash].hot-update.json",// 热更新加载的主文件名，默认值
      // jsonpFunction: "webpackJsonp",// 懒加载jsonp函数名，默认值
      // library: pluginName,// 是否导出为独立发布的文件，开发插件时需要
      // libraryTarget: "commonjs2",// 插件导出形式
    },
    module: {
      rules: [{ 
        test: /\.jsx?$/,
        include: [ appSrcPath ],
        exclude: [ appNodeModulesPath ],
        use: [{
          loader: 'babel-loader',
          options: BabelOptions
        }, eslintLoader]
      },{
        test: /\.tsx?$/,
        include: [ appSrcPath ],
        use: [{
          loader: 'babel-loader',
          options: BabelOptions,
        },
        {
          loader: 'awesome-typescript-loader',
          options: {
            transpileOnly: true,
          },
        }],
      },{
        test: /\.css$/,
        include: [ appSrcPath ],
        use: isProd || debug ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: CssLoadersWithModules.slice(1)
        }) : CssLoadersWithModules
      },{
        test: /\.less$/,
        include: [ appSrcPath ],
        use: isProd || debug ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            ...CssLoadersWithModules.slice(1),
            { loader: 'less-loader' }// compiles Less to CSS
          ]
        }) : [ 
          ...CssLoadersWithModules,
          { loader: 'less-loader' }
        ]
      },{
        test: /\.scss$/,
        include: [ appSrcPath ],
        use: isProd || debug ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            ...CssLoadersWithModules.slice(1),
            { loader: 'sass-loader' }
          ]
        }) : [
          ...CssLoadersWithModules,
          { loader: 'sass-loader' }
        ]
      },{
        test: /\.css$/,
        include: [ appNodeModulesPath ],
        use: isProd || debug ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: CssLoadersWithoutModules.slice(1)
        }) : CssLoadersWithoutModules
      },{
        test: /\.less$/,
        include: [ appNodeModulesPath ],
        use: isProd || debug ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            ...CssLoadersWithoutModules.slice(1),
            { loader: 'less-loader' }// compiles Less to CSS
          ]
        }) : [ 
          ...CssLoadersWithoutModules,
          { loader: 'less-loader' }
        ]
      },{
        test: /\.scss$/,
        include: [ appNodeModulesPath ],
        use: isProd || debug ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            ...CssLoadersWithoutModules.slice(1),
            { loader: 'sass-loader' }
          ]
        }) : [
          ...CssLoadersWithoutModules,
          { loader: 'sass-loader' }
        ]
      },{
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ]
      },{
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [ 'file-loader' ]
      },{
        test: /\.(csv|tsv)$/,
        use: [ 'csv-loader' ]
      },{
        test: /\.xml$/,
        use: [ 'xml-loader' ]
      },{
        test: /\.html$/,
        use: [ 'html-loader' ]
      }]
    },
    resolve: {
      modules: [ appNodeModulesPath, ownNodeModulesPath ],
      extensions: [ '.js', '.jsx', '.tsx', '.json' ],// 可忽略扩展名的模块，靠前的优先级最高
      alias,// import, require加载时的别名
    },
    plugins: [
      // If you require a missing module and then `npm install` it, you still have
      // to restart the development server for Webpack to discover it. This plugin
      // makes the discovery automatic so you don't have to restart.
      // See https://github.com/facebookincubator/create-react-app/issues/186
      new WatchMissingNodeModulesPlugin(appNodeModulesPath),

      new NpmInstallPlugin({
        // Use --save or --save-dev
        dev: false,
        // Install missing peerDependencies
        peerDependencies: true,
        // Reduce amount of console logging
        quiet: false,
        // npm command used inside company, yarn is not supported yet
        npm: 'npm'
      }),
  
      // webpack.DefinePlugin定义全局环境变量的简写形式
      // new webpack.EnvironmentPlugin(['NODE_ENV']),
  
      // 配置全局常量
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': NODE_ENV
      }),
  
      // 将模块作为变量导出
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery'
      // }),
  
      existsSync(appPublicPath) ? 
        new CopyWebpackPlugin([{
          from: appPublicPath,
          to: appDistPath
        }]) : null,
  
      !debug ? new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      }) : null
    ].filter(plugin=>!!plugin)
  };

  return commonConfig;
};

export default getCommonConfig;
