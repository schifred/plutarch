'use strict';

import debug from 'debug';
import webpack from 'webpack';
import merge from 'webpack-merge';

import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import getCommonConfig from './webpack.common';

const _debug = debug('plutarch');

function getBuildConfig(paths, processArgv, yargsArgv){
  _debug(`get build config`)

  const { appDistPath } = paths;

  const buildConfig = {
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
      new webpack.optimize.OccurrenceOrderPlugin(),
      new ExtractTextPlugin({
        filename: `common.css`,
        allChunks: true,
      }),
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
  
  const commonConfig = getCommonConfig(paths, processArgv, yargsArgv);
  
  _debug(`merge common config into server config`)

  const webpackConfig = merge(commonConfig,buildConfig);

  return webpackConfig;
};

export default getBuildConfig;
