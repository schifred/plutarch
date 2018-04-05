import { basename, dirname, extname, resolve } from 'path';
import { existsSync, statSync } from 'fs';
import { isFunction, isString } from 'lodash';

class Router {
  constructor(app, context){
    const { paths: { plmcs } } = context;
    this.app = app;
    this.context = context;
    this.controllers = { };
  }
  
  get(...args){
    this._delegateAppMethod('get', ...args);
  }

  post(...args){
    this._delegateAppMethod('post', ...args);
  }

  put(...args){
    this._delegateAppMethod('put', ...args);
  }

  delete(...args){
    this._delegateAppMethod('delete', ...args);
  }

  // 委托 app 实例配置路由控制器，仅支持单个控制器
  _delegateAppMethod(key, path, arg){
    const controllers = this._getControllers.apply(this, key, arg);
    this.app[key].call(this.app, path, controller);
  }

  // 获取控制器
  _getController(method, arg){
    let controller;

    // 文件路径
    if ( isString(arg) )
      controller = this._getFileController(arg);

    // 函数控制器
    if ( isFunction(arg) )
      controller = arg;

    if ( !controller )
      controller = (req, res) => {
        res.send(arg);
      };
    
    return controller;
  }

  // 通过文件路径获取单个控制器
  _getControllerFromFile(path){
    const { paths: { plmcs } } = this.context;
    path = resolve(plmcs);
    let ext = extname(path) || '.js';

    if ( ext !== '.json' || ext !== '.js' || !existsSync(path) || !statSync(path).isFile() )
      throw new Error(`controller ${path} should be a json file or a js file`);

    if ( this.controllers[path] )
      return this.controllers[path];

    let controller = require(path);
    
    if ( ext === '.json' )
      controller = (req, res) => {
        return res.send(controller);
      };

    this.controllers[path] = controller;

    return controller;
  }

};

export default Router;
