"use strict";

import debug from 'debug';
import { existsSync, unlinkSync } from 'fs';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import logger from '../utils/logger';
import wrapServer from '../utils/ServerWrapper';
import readPlutarchServer from '../utils/readPlutarchServer';
import getDefaultConfig from '../webpack/webpack.server';
import getDllConfig from '../webpack/webpack.dll';

import { getYargsArgv, getProcessArgv, getPaths, resolvePlutarchConfig } from '../utils';
import applyMock from '../utils/applyMock';

const _debug = debug('plutarch');

const processArgv = getProcessArgv();
const yargsArgv = getYargsArgv();
const { cwd } = processArgv;
const paths = getPaths(cwd,yargsArgv);
const { appSrcPath ,resolveApp } = paths;

const defaultConfig = getDefaultConfig(paths, processArgv, yargsArgv);
const { webpackConfig, extra } = resolvePlutarchConfig(paths, defaultConfig);

function exec(){
  if ( extra && extra.dll ){
    compileDll(webpackConfig,extra);
  }else{
    runServer(webpackConfig);
  };
};

/*
 * plutarch.config.js: 
 * { 
 *   extra: {
 *     include: ['react']
 *   } 
 * }
 * 提前编译稳定的插件，这些插件在各次编译时无须重复编译，提高性能
 */
function compileDll(webpackConfig,extra){
  const { dll: rebuild } = yargsArgv;
  const dllConfig = getDllConfig(paths, extra.dll);
  const dllCompiler = webpack(dllConfig);
  
  const manifestPath = resolveApp('dist/plutarch-manifest.json');

  if ( existsSync(manifestPath) && !rebuild ){
    addPluginAndRunServer(webpackConfig);
  }else if( existsSync(manifestPath) && rebuild ){
    unlinkSync(manifestPath);
    compile(dllCompiler,webpackConfig);
  }else{
    compile(dllCompiler,webpackConfig);
  };

  function compile(dllCompiler,webpackConfig){
    _debug('compile webpack dll config，create mainfest.json');

    dllCompiler.run((err,stats)=>{
      if ( err ){
        logger.red("create mainfest.json failed");
        return;
      };
  
      logger.blue("create mainfest.json successful");
  
      addPluginAndRunServer(webpackConfig);
    });
  };

  function addPluginAndRunServer(webpackConfig){
    _debug('add dll plugin to webpack config');

    if ( !webpackConfig.plugins ) webpackConfig.plugins = [];
    webpackConfig.plugins.push(new webpack.DllReferencePlugin({
      context: appSrcPath,
      manifest: require(manifestPath)
    }));

    runServer(webpackConfig);
  };
};

// 启动本地调试服务
function runServer(webpackConfig){
  const { devServer: devServerConfig } = webpackConfig;
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
      logger.red("create dev server failed");
      logger.log(err.stack || err.message);
      return;
    };

    logger.blue(`create dev server successful: http://${devServerConfig.host}:${devServerConfig.port}`);
  });
};

exec();
