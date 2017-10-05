"use strict";

import debug from 'debug';
import { existsSync } from 'fs';
import { isFunction } from 'lodash';

const _debug = debug('plutarch');

// 装饰扩展devServerApp
class ServerWrapper{
  constructor(app){
    this.app = app;
    this.wrappers = [];
  }

  add(wrapper){
    this.wrappers.push(wrapper);
    return this;
  }

  wrap(){
    this.wrappers.map(wrapper=>{
      if ( isFunction(wrapper) ) wrapper.call(this, this.app);
    });
    this.wrappers = [];
    return this;
  }
};

// 获取plutarch.server.js配置文件，用于对devServerApp进行扩展
function  applyPlutarchServer(paths){
  const { plutarchServerPath } = paths;
  let serverConfig;

  if ( existsSync(plutarchServerPath) ){
    serverConfig = require(plutarchServerPath);

    invariant(
      isFunction(serverConfig),
      "plutarch.server should export as a function"
    );
  };
  
  return serverConfig;
};

export default function wrapServer(app, paths){
  const serverWrapper = new ServerWrapper(app);
  if ( applyPlutarchServer(paths) ) serverWrapper.add(applyPlutarchServer);
  return serverWrapper;
};
