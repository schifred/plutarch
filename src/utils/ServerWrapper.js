"use strict";

import isFunction from 'lodash/isFunction';

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
      if ( isFunction(wrapper) ) wrapper(this.app);
    });
    this.wrappers = [];
    return this;
  }
};

export default function wrapServer(app){
  const serverWrapper = new ServerWrapper(app);
  return serverWrapper;
};
