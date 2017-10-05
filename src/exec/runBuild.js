"use strict";

import debug from 'debug';
import webpack from 'webpack';

import logger from '../utils/logger';
import { getYargsArgv, getProcessArgv, getPaths, resolvePlutarchConfig } from '../utils';
import getDefaultConfig from '../webpack/webpack.build';

const _debug = debug('plutarch');

const processArgv = getProcessArgv();
const yargsArgv = getYargsArgv();
const { cwd } = processArgv;
const paths = getPaths(cwd,yargsArgv);
const { appSrcPath ,resolveApp } = paths;

const defaultConfig = getDefaultConfig(paths, processArgv, yargsArgv);
const { webpackConfig, extra } = resolvePlutarchConfig(paths, defaultConfig);

function runBuild(){
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

runBuild();
