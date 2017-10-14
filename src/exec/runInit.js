"use strict";

import debug from 'debug';
import { existsSync, readFileSync, writeFileSync, mkdir } from 'fs';
import { relative } from 'path';

import logger from '../utils/logger';
import { getProcessArgv, getYargsArgv, getPaths, traverseDirectory } from '../utils';

const _debug = debug('plutarch');

const processArgv = getProcessArgv();
const yargsArgv = getYargsArgv();
const { type } = yargsArgv;
const { cwd } = processArgv;
const paths = getPaths(cwd,yargsArgv);
const { appSrcPath, resolveApp, resolveOwn } = paths;
const templateRootPath = resolveOwn(`templates/${type}-project`);

function exec(){
  _debug(`init ${type} project`);
  try{
    scanAndCopyFile(templateRootPath);
  }catch(e){
    logger.red('init failed, you should retry');
  };
};

function scanAndCopyFile(path){
  traverseDirectory(path,(fileName,dirOrFilePath,isFile)=>{
    if ( isFile ){
      let content = readFileSync(dirOrFilePath,'utf-8');
      let relativePath = relative(templateRootPath,dirOrFilePath);
      let appPath = resolveApp(relativePath);
      writeFileSync(appPath,content);
    }else{
      let relativePath = relative(templateRootPath,dirOrFilePath);
      let appPath = resolveApp(relativePath);
      if( !existsSync(relativePath) ) mkdir(relativePath);
      scanAndCopyFile(dirOrFilePath);
    };
  },/\.ejs$|\.js|\.json$/)
};

exec();
