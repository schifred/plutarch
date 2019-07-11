'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let UrlLoader = class UrlLoader extends _Mod.Mod {

  constructor(opts = {}) {
    super(opts);
    this.defaultOptions = {
      limit: 8192
    };
    this.init();
  }
};
exports.default = UrlLoader;
;
module.exports = exports.default;