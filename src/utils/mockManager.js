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
    this.fileControllerCache = { };
  }

  use(){
    this.app.use.apply(this.app,arguments);
  }

  get(path){
    const args = arguments.slice(1);
    const funcs = this.getRouteFuncs.apply(this,args);
    this.app.get.apply(this.app,[path].concat(funcs));
  }

  post(path){
    const args = arguments.slice(1);
    const funcs = this.getRouteFuncs.apply(this,args);
    this.app.post.apply(this.app,[path].concat(funcs));
  }

  put(path){
    const args = arguments.slice(1);
    const funcs = this.getRouteFuncs.apply(this,args);
    this.app.put.apply(this.app,[path].concat(funcs));

  }

  delete(path){
    const args = arguments.slice(1);
    const funcs = this.getRouteFuncs.apply(this,args);
    this.app.delete.apply(this.app,[path].concat(funcs));
  }

  getRouteFuncs(controller){
    const args = arguments.slice();

    if ( args.length===1 && isString(controller) ){
      const fileController = this.getFileController(controller);
      if ( fileController ){
        return [fileController];
      }else{
        return [function(req,res){
          res.send(controller);
        }];
      };
    };

    if ( args.length===1 && !isFunction(controller) ){
      return {
        type: "data",
        data: controller
      };
    };

    if ( args.length>1 ){
      return args.map(arg=>{
        let func;
        if ( isString(arg) ){
          func = this.getFileController(arg);
        };
        if ( isFunction(arg) ){
          func = arg;
        };

        return func;
      })
    };
  }

  getFileController(path){
    let splitPaths = controller.split(".");
    let len = splitPaths.length;
    let ext = "js";
    let funcName;

    if ( path.match(/\.js(on)?$/) ){
      ext = splitPaths.pop();
      path = splitPaths.slice(0,len-1).join("/");
    }else{
      path = splitPaths.slice(0,len-1).join("/");
      funcName = splitPaths[len-1];
    };

    path += `.${ext}`;

    if ( this.fileControllerCache[path] )
      return funcName ? this.fileControllerCache[path][funcName] : this.fileControllerCache[path];

    const filePath = path.resolve(this.mockDirPath,path);

    if ( fs.existsSync(filePath) ){
      const fileController = require(filePath);
      this.fileControllerCache[path] = fileController;
      return funcName ? fileController[funcName] : fileController;
    };
  }

}

module.exports = function mock(devServerApp,options){
  const { cwd, mockDir } = options;
  const appMockPath = path.resolve(cwd,'./plutarch.mock.js');
  const appMockConfig = require(appMockPath);
  const manager = new Manager(devServerApp,{
    mockDirPath: path.resolve(cwd,mockDir)
  });

  if ( isFunction(appMockConfig) ){
    appMockConfig(manager);
    return;
  };

  if ( isPlainObject(appMockConfig) ){
    Object.keys(appMockConfig).map(key=>{
      let matches = key.split(/\s/);
      let method = matches[0];
      let path = matches[1];
      
      manager[method](path,appMockConfig[key]);
    });
  };

};
