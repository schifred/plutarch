"use strict";

import debug from 'debug';
import { existsSync, unlinkSync, readFileSync, writeFileSync, mkdir } from 'fs';
import { relative } from 'path';

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
  scanAndCopyFile(templateRootPath);
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
      mkdir(relativePath);
      scanAndCopyFile(dirOrFilePath);
    };
  },/\.ejs$|\.js|\.json$/)
};

exec();
