'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const readdirSync = require('../utils/readdirSync');
const commonConfig = require('./webpack.common.js');

const cwd = process.cwd();
const appSrcPath = path.resolve(cwd,'src');
const appDistPath = path.resolve(cwd,'dist');

const dirAndFileMap = readdirSync(appSrcPath);
const { fileMap: entry, dirMap: alias } = dirAndFileMap;

const publicConfig = {
  output: {
    libraryTarget: 'umd'
  },
  devtool: "source-map",
  externals: {
    'jquery': {
      amd: 'jquery',
      root: 'jQuery',
      commonjs: 'jquery',
      commonjs2: 'jquery'
    },
    'react': {
      amd: 'react',
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react'
    },
    'react-dom': {
      amd: 'react-dom',
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    },
    'redux': {
      amd: 'redux',
      root: 'Redux',
      commonjs: 'redux',
      commonjs2: 'redux'
    },
    'react-redux': {
      amd: 'react-redux',
      root: 'ReactRedux',
      commonjs: 'react-redux',
      commonjs2: 'react-redux'
    },
    'react-router': {
      amd: 'react-router',
      root: 'ReactRouter',
      commonjs: 'react-router',
      commonjs2: 'react-router'
    },
  },
  plugins: [
    new CleanWebpackPlugin([ appDistPath ],{
      dry: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: `common.css`,
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin('common'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
        ascii_only: true,
      },
    })
  ]
};

const config = merge(commonConfig,publicConfig);

module.exports = config;
