'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const getProcessArgvs = require('../utils/getProcessArgvs');
const getPaths = require('../utils/getPaths');
const readdirSync = require('../utils/readdirSync');

const { cwd, env, NODE_ENV, isProd } = getProcessArgvs(process);
const { appSrcPath, appDistPath, appPublicPath, appNodeModulesPath } = getPaths(cwd);
const { fileMap: entry, dirMap: alias } = readdirSync(appSrcPath);

const commonConfig = {
  target: "web",// 打包文件使用平台形势，默认值
  entry: entry,// 入口文件[ string | array | object ]
  context: path.resolve(__dirname,"../../"),
  output: {
    path: appDistPath,
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",// 非入口文件名，require.ensure异步加载脚本文件
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
      test: /\.js|\.jsx$/,
      include: [ appSrcPath ],
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [ 
            require.resolve('babel-preset-react'),// “babel-preset-env”用于替代es015
            require.resolve('babel-preset-env'), 
            require.resolve('babel-preset-stage-0'), 
          ],
          plugins: [ 
            require.resolve('babel-plugin-transform-decorators-legacy'), 
            require.resolve('babel-plugin-transform-runtime'), 
            require.resolve('babel-plugin-add-module-exports') 
          ],
          cacheDirectory: true
        }
      }
    },{
      test: /\.css$/,
      use: isProd ? ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [ 'css-loader' ]
      }) : 
        [ 'style-loader', 'css-loader' ]
    },{
      test: /\.less$/,
      use: isProd ? ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [ "css-loader", "less-loader" ]
      }) : [{
        loader: "style-loader"// creates style nodes from JS strings
      }, {
        loader: "css-loader"// translates CSS into CommonJS
      }, {
        loader: "less-loader"// compiles Less to CSS
      }]
    },{
      test: /\.scss$/,
      use: isProd ? ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [ "css-loader", "sass-loader" ]
      }) : [{
        loader: "style-loader"// creates style nodes from JS strings
      }, {
        loader: "css-loader"// translates CSS into CommonJS
      }, {
        loader: "sass-loader"// compiles Sass to CSS
      }]
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
    modules: [ appNodeModulesPath, 'node_modules' ],
    extensions: [ ".js", ".jsx", ".tsx", ".json" ],
    alias,// import, require加载时的别名
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': NODE_ENV
    }),
    // 将模块作为变量导出
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),
    fs.existsSync(appPublicPath) ? 
      new CopyWebpackPlugin([{
        from: appPublicPath,
        to: appDistPath
      }]) : "",
    new webpack.optimize.CommonsChunkPlugin({
      name: "common"
    })
  ].filter(plugin=>!!plugin)
};

module.exports = commonConfig;
