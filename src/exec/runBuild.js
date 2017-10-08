"use strict";

import debug from 'debug';
import { existsSync, unlinkSync } from 'fs';
import webpack from 'webpack';

import logger from '../utils/logger';
import { getYargsArgv, getProcessArgv, getPaths, resolvePlutarchConfig } from '../utils';
import getDefaultConfig from '../webpack/webpack.build';
import getDllConfig from '../webpack/webpack.dll';

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
    runBuild(webpackConfig);
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
        logger.red('create mainfest.json failed');
        return;
      };
  
      logger.blue('create mainfest.json successful');
  
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

    runBuild(webpackConfig);
  };
};

function runBuild(webpackConfig){
  _debug('building');

  const compiler = webpack(webpackConfig);

  compiler.run((err,stats)=>{
    if ( err ){
      logger.red('build failed');
      return;
    };

    const compilerLog = stats.toString({
      colors: true
    });
    logger.log(compilerLog);
    logger.blue('build successful');
  });
};

exec();
