'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const readdirSync = require('../utils/readdirSync');

const cwd = process.cwd();
const appSrcPath = path.resolve(cwd,'src');
const appDistPath = path.resolve(cwd,'dist');
const appPublicPath = path.resolve(cwd,'public');

const dirAndFileMap = readdirSync(appSrcPath);
const { fileMap: entry, dirMap: alias } = dirAndFileMap;

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  fs.existsSync(appPublicPath) ? 
    new CopyWebpackPlugin([{
      from: appPublicPath,
      to: appDistPath
    }]) : "",
  new webpack.optimize.CommonsChunkPlugin({
    name: "common"
  })
];

const commonConfig = {
  entry: entry,// 入口文件[ string | array | object ]
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",// require.ensure异步加载脚本的打包文件名
    path: appDistPath,
    publicPath: "/",
  },
  module: {
    rules: [{ 
      test: /\.js|\.jsx$/,
      include: [ appSrcPath ],
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [ 'es2015', 'react', 'stage-0' ],
          plugins: [ 'transform-runtime', 'add-module-exports' ],
          cacheDirectory: true
        }
      }
    },{
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    },{
      test: /\.less$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "less-loader" // compiles Less to CSS
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
    extensions: [ ".js", ".jsx", ".tsx", ".json" ],
    alias,// import, require加载时的别名
  },
  plugins: plugins.filter(plugin=>!!plugin)
};

module.exports = commonConfig;
