"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _fs = require("fs");

var _lodash = require("lodash");

class Router {
  constructor(app, context) {
    this.app = app;
    this.context = context;
  }

  get(...args) {
    this._delegateAppMethod('get', ...args);
  }

  post(...args) {
    this._delegateAppMethod('post', ...args);
  }

  put(...args) {
    this._delegateAppMethod('put', ...args);
  }

  delete(...args) {
    this._delegateAppMethod('delete', ...args);
  } // 委托 app 实例配置路由控制器，仅支持单个控制器


  _delegateAppMethod(key, path, arg) {
    const controller = this._getController.call(this, key, arg);

    this.app[key].call(this.app, path, controller);
  } // 获取控制器


  _getController(method, arg) {
    let controller; // 文件路径

    if ((0, _lodash.isString)(arg)) controller = this._getFileController(arg); // 函数控制器

    if ((0, _lodash.isFunction)(arg)) controller = arg;
    if (!controller) controller = (req, res) => {
      res.send(arg);
    };
    return controller;
  } // 通过文件路径获取 mocks 文件夹下的单个控制器


  _getFileController(path) {
    const {
      paths: {
        plmcs
      }
    } = this.context;
    let ext = (0, _path.extname)(path);
    const fullpath = (0, _path.resolve)(plmcs, ext ? path : `${path}.js`);
    ext = ext || '.js';
    if (ext !== '.json' && ext !== '.js' && !(0, _fs.existsSync)(fullpath) && !(0, _fs.statSync)(fullpath).isFile()) throw new Error(`controller ${path} should be a json file or a js file`);

    let controller = require(fullpath);

    if (ext === '.json') controller = (req, res) => {
      return res.send(controller);
    };
    return controller;
  }

}

;
var _default = Router;
exports.default = _default;
module.exports = exports.default;