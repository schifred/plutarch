"use strict";

const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackValidator = require('webpack/lib/validateSchema');// webpack配置校验
const webpackOptionsSchema = require('webpack/schemas/webpackOptionsSchema.json');// webpack配置校验规则
const WebpackOptionsValidationError = require('webpack/lib/WebpackOptionsValidationError');
const WebpackDevServer = require('webpack-dev-server');
const logger = require('./utils/logger');
const wrapServer = require('./utils/ServerWrapper');
const getDllConfig = require('./utils/getDllConfig');

const defaultConfig = require('./webpack/webpack.server');
const readPlutarchConfig = require('./utils/readPlutarchConfig');
const readPlutarchServer = require('./utils/readPlutarchServer');
const applyMock = require('./utils/applyMock');

const cwd = process.cwd();
const argv = yargs.argv;
const { port } = argv;

console.log(process.pwd)

function mergeConfig(prevConfig,customConfig){
  let currentConfig = merge(prevConfig,customConfig);

  if ( port && currentConfig.devServer.port != port ) 
    currentConfig.devServer.port = port;

  return currentConfig;
};

function getConfig(){
  const plutarchConfig = readPlutarchConfig(cwd);
  const webpackConfig = mergeConfig(defaultConfig,plutarchConfig);

  return webpackConfig;
};

function compileDll(webpackConfig){
  const dllConfig = getDllConfig(cwd,webpackConfig.dll);
  delete webpackConfig.dll;
  const dllCompiler = webpack(dllConfig);
  
  const manifestPath = path.resolve(cwd,'./dist/plutarch-manifest.json');

  if ( fs.existsSync(manifestPath) ){
    addPluginAndRunServer(webpackConfig);
  }else{
    compile(dllCompiler,webpackConfig);
  };

  function compile(dllCompiler,webpackConfig){
    dllCompiler.run((err,stats)=>{
      if ( err ){
        logger.red("生成mainfest.json失败");
        return;
      };
  
      logger.blue("生成mainfest.json成功");
  
      addPluginAndRunServer(webpackConfig);
    });
  };

  function addPluginAndRunServer(webpackConfig){
    if ( !webpackConfig.plugins ) webpackConfig.plugins = [];
    webpackConfig.plugins.push(new webpack.DllReferencePlugin({
      context: path.resolve(cwd,'./src'),
      manifest: require(manifestPath)
    }));

    runServer(webpackConfig);
  };
};

function runServer(webpackConfig){
  const webpackOptionsValidationErrors = webpackValidator(webpackOptionsSchema,webpackConfig);

  if ( webpackOptionsValidationErrors.length ){
    logger.red("webpack配置文件有误：");
    webpackOptionsValidationErrors.map(err=>{
      logger.red(JSON.stringify({
        dataPath: err.dataPath,
        data: err.data,
      }));
    });

    throw new WebpackOptionsValidationError(webpackOptionsValidationErrors);
  };

  const devServerConfig = webpackConfig.devServer;
  const compiler = webpack(webpackConfig);

  const devServer = new WebpackDevServer(compiler, devServerConfig);
  const serverWrapper = wrapServer(devServer.app);

  // plutarch.server.js配置文件可以为调试服务器添加中间件
  const plutarchServerWrapper = readPlutarchServer(cwd);
  serverWrapper.add(plutarchServerWrapper);

  // plutarch.mock.js配置文件可以为调试服务器添加模拟路由
  const plutarchMockWrapper = applyMock({
    cwd,
    mockDirPath: "./mocks",
    mockRouterPath: "./plutarch.mock.js"
  });
  serverWrapper.add(plutarchMockWrapper);
  
  serverWrapper.wrap();

  devServer.listen(devServerConfig.port, devServerConfig.host, (err) => {
    if (err) {
      logger.red("本地dev调试服务启动失败");
      logger.log(err.stack || err.message);
      return;
    };

    logger.blue(`本地dev调试服务已启动: http://${devServerConfig.host}:${devServerConfig.port}`);
  });
};

function init(){
  const webpackConfig = getConfig();

  if ( webpackConfig.dll ){
    compileDll(webpackConfig);
  }else{
    runServer(webpackConfig);
  };
};


init();
