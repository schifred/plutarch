"use strict";

const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const logger = require('./utils/logger');

const defaultConfig = require('./webpack/webpack.build');
const readPlutarchConfig = require('./utils/readPlutarchConfig');
const plutarchMerge = require('./utils/plutarchMerge');

const cwd = process.cwd();
const argv = yargs.argv;
const { watch } = argv;

function runBuild(){
  const { plutarchConfig } = readPlutarchConfig(cwd);
  const webpackConfig = plutarchMerge(defaultConfig,plutarchConfig);
  
  const devServerConfig = webpackConfig.devServer;

  const compiler = webpack(webpackConfig);

  compiler.run((err,stats)=>{
    if ( err ){
      logger.red("本地项目打包失败");
      return;
    };

    const compilerLog = stats.toString({
      colors: true
    });
    logger.log(compilerLog);
    logger.blue("本地项目打包成功");
  });
};


runBuild();
