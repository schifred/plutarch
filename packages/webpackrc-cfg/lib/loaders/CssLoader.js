'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

// https://www.jianshu.com/p/98404525793c?utm_source=oschina-app
let CssLoader = class CssLoader extends _Mod.Mod {

  constructor(opts = {}) {
    super(opts);
    this.defaultOptions = {
      modules: true,
      camelCase: true,
      localIdentName: '[local]'
    };
    this.init();
  }
};
exports.default = CssLoader;
;
module.exports = exports.default;