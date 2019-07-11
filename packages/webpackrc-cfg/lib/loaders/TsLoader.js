'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let TsLoader = class TsLoader extends _Mod.Mod {

  constructor(opts = {}) {
    super(opts);
    this.defaultOptions = {
      transpileOnly: true
    };
    this.init();
  }
};
exports.default = TsLoader;
;
module.exports = exports.default;