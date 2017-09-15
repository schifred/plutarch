"use strict";

const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const chalk = require("chalk");
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');

const defaultConfig = require('./webpack/webpack.build');
const readPlutarchConfig = require('./utils/readPlutarchConfig');
const cwd = process.cwd();
const argv = yargs.argv;
const { watch } = argv;

function mergeConfig(prevConfig,customConfig){
  let currentConfig = merge(prevConfig,customConfig);

  return currentConfig;
};

function runBuild(){
  const plutarchConfig = readPlutarchConfig(cwd);
  const currentConfig = mergeConfig(defaultConfig,plutarchConfig);
  const devServerConfig = currentConfig.devServer;

  const compiler = webpack(currentConfig);

  compiler.run((err,stats)=>{
    const compilerLog = stats.toString({
      colors: true
    });
    console.log(compilerLog);
    console.log(chalk.blue("build successful."));
  });
};


runBuild();
