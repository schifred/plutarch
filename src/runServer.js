"use strict";

const fs = require("fs");
const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');
const defaultConfig = require('./webpack/webpack.server');
const devServerConfig = defaultConfig.devServer;
const cwd = process.cwd();

function readConfig(){
  const plutarchConfigPath = path.resolve(cwd,"./plutarch.config.js");
  let plutarchConfig = {};

  if ( fs.existsSync(plutarchConfigPath) ){
    plutarchConfig = require(plutarchConfigPath);

    let { entry, output } = plutarchConfig;
    if ( entry ) plutarchConfig.entry = path.resolve(cwd,entry);
    if ( output ){
      if ( output.path ) plutarchConfig.output.path = path.resolve(cwd,output.path);
      if ( output.publicPath ) plutarchConfig.output.publicPath = path.resolve(cwd,output.publicPath);
    };
  };

  return plutarchConfig;
};

function mergeConfig(prevConfig,customConfig){
  let currentConfig = merge(prevConfig,customConfig);
  return currentConfig;
};

function runServer(){
  const plutarchConfig = readConfig();
  const currentConfig = mergeConfig(defaultConfig,plutarchConfig);
  const compiler = webpack(currentConfig);


  const devServer = new WebpackDevServer(compiler, devServerConfig);

  devServer.listen(devServerConfig.port, devServerConfig.host, (err) => {
    if (err) {
      return console.log(err);
    }
  });
};


runServer();
