"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Mod = require("../Mod");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// https://www.jianshu.com/p/98404525793c?utm_source=oschina-app
class CssLoader extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "defaultOptions", {
      modules: true,
      camelCase: true,
      localIdentName: '[local]'
    });

    this.init();
  }

}

exports.default = CssLoader;
;
module.exports = exports.default;