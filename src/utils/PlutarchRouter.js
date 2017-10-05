'use strict';

import path from 'path';
import fs from 'fs';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

class PlutarchRouter{
  
  constructor(devServerApp,options){
    this.app = devServerApp;
    this.mockDirPath = options.mockDirPath;// 控制器所在目录
    this.fileControllerCache = { };// 缓存文件控制器
  }
  
  get(path){
    const args = [].slice.call(arguments,1);
    const controllers = this._getControllers.apply(this,["get"].concat(args));
    this.app.get.apply(this.app,[path].concat(controllers));
  }

  post(path){
    const args = [].slice.call(arguments,1);
    const controllers = this._getControllers.apply(this,["post"].concat(args));
    this.app.post.apply(this.app,[path].concat(controllers));
  }

  put(path){
    const args = [].slice.call(arguments,1);
    const controllers = this._getControllers.apply(this,["put"].concat(args));
    this.app.put.apply(this.app,[path].concat(controllers));

  }

  delete(path){
    const args = [].slice.call(arguments,1);
    const controllers = this._getControllers.apply(this,["delete"].concat(args));
    this.app.delete.apply(this.app,[path].concat(controllers));
  }

  _getControllers(methodType,func){
    const args = [].slice.call(arguments,1);

    // 文件路径或普通字符串
    if ( args.length === 1 && isString(func) ){
      const controller = this._getFileController(func);
      if ( controller && isFunction(controller) ){
        return [controller];
      }else if( isFunction(controller) ){
        logger.red(`提醒：${methodType}方法配置单参数时，参数${func}能找到对应的文件，但文件导出不是函数`);
      }else{
        return [function controller(req,res){
          res.send(func);
        }];
      };
    };

    // json数据等
    if ( args.length === 1 && !isFunction(func) ){
      return [function controller(req,res){
        res.send(func);
      }];
    };
    
    return args.map((arg,idx) => {
      let controller;

      if ( isString(arg) ){
        controller = this._getFileController(arg);

        if ( !controller )
          throw new Error(`${methodType}方法配置多参数时，第${idx+2}个参数${arg}找不到匹配的文件`)

        return controller;
      };

      if ( isFunction(arg) ){
        controller = arg;
        return controller;
      };

      throw new Error(`${methodType}方法配置多参数时，第${idx+2}个参数${arg}不是函数、路径字符串`);

    });
  }

  _getFileController(filePath){
    let splitPaths = filePath.split(".");
    let ext;
    let controllerName;
    let path;

    if ( filePath.match(/\.js(on)?$/) ){
      ext = splitPaths.pop();
      path = splitPaths.join("/");
    }else{
      controllerName = splitPaths.pop();
      path = splitPaths.join("/");
    };

    path += ext ? `.${ext}` : "";

    if ( this.fileControllerCache[path] )
      return controllerName ? this.fileControllerCache[path][controllerName] : 
        this.fileControllerCache[path];

    let absolutePath = path.resolve(this.mockDirPath,path);
    const existFlag = fs.existsSync(absolutePath);
    const stat = existFlag && fs.statSync(absolutePath);
    const isFile = stat && stat.isFile();
    const isDir = stat && stat.isDirectory();

    if ( isFile ){
      let fileController = require(absolutePath);
      this.fileControllerCache[path] = fileController;
      return funcName ? fileController[funcName] : fileController;
    };

    if ( isDir && controllerName ){
      let lastPath = "/" + controllerName;
      absolutePath = path.resolve(absolutePath,lastPath);
      if ( fs.existsSync(absolutePath) ){
        let fileController = require(absolutePath);
        this.fileControllerCache[path + lastPath] = fileController;
        return fileController;
      };
    };
  }

};

export default PlutarchRouter;
