'use strict';

const path = require('path');
const fs = require('fs');
const isFunction = require('lodash/isFunction');
const isPlainObject = require('lodash/isPlainObject');
const isString = require('lodash/isString');

class Manager{
  constructor(app,options){
    this.app = app;
    this.mockDirPath = options.mockDirPath;
  }

  use(){
    this.app.use.apply(this.app,arguments);
  }

  get(path,controller){

  }

  post(){

  }

  put(){

  }

  delete(){

  }

  handle(req,res,path,controller){
    const args = arguments.slice(1);

    if ( isString(controller) ){
      res.send()
    };

    if ( !isFunction(controller) ){
      res.send(controller);
    }
  }

}

module.exports = function handleDevServer(devServerApp,options){
  const { cwd, mockDir } = options;
  const appMockPath = path.resolve(cwd,'./plutarch.mock.js');
  const appMockConfig = require(appMockPath);

  if ( isFunction(appMockConfig) ){
    const manager = new Manager(devServerApp,{
      mockDirPath: path.resolve(cwd,mockDir)
    });
    appMockConfig(devServerApp);
    return;
  };

  if ( isPlainObject(appMockConfig) ){
    Object.keys(appMockConfig).
  };

};
