'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const utils = require('../utils/index');
const commonConfig = require('./webpack.common.js');

const cwd = process.cwd();
const appSrcPath = path.resolve(cwd,'src');
const appDistPath = path.resolve(cwd,'dist');

const dirAndFileMap = utils.readdirSync(appSrcPath);
const { fileMap: entry, dirMap: alias } = dirAndFileMap;

const serverConfig = {
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin([ appDistPath ],{
      dry: false
    }),
    new HtmlWebpackPlugin({
      title: 'Plutarch App',
      showErrors: true,
      template: `${appSrcPath}/index.html`
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    disableHostCheck: true,
    compress: true,
    hot: true,
    contentBase: appDistPath,// 额外的静态资源所在目录
    publicPath: "/",// 内存中编译文件由服务器加载时的文件位
    quiet: false,
    stats: {
      colors: true
    },//终端中输出结果为彩色
    watchOptions: {
      //ignored: /node_modules/,
    },
    historyApiFallback: true,//不跳转
    host: "127.0.0.1",
    port: 3001,
  }
};

const config = merge(commonConfig,serverConfig);

module.exports = config;
