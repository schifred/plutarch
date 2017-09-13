"use strict";

const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');

const defaultConfig = require('./webpack/webpack.server');
const readPlutarchConfig = require('./utils/readPlutarchConfig');
const cwd = process.cwd();
const argv = yargs.argv;
const { watch } = argv;

function mergeConfig(prevConfig,customConfig){
  let currentConfig = merge(prevConfig,customConfig);

  return currentConfig;
};

function runPublic(){
  const plutarchConfig = readPlutarchConfig(cwd);
  const currentConfig = mergeConfig(defaultConfig,plutarchConfig);
  const devServerConfig = currentConfig.devServer;

  const compiler = webpack(currentConfig);

  compiler.run(()=>{
    console.log("build successful.")
  });
};


runPublic();
