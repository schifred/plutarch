'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let DLLReferencePlugin = class DLLReferencePlugin extends _Mod.Plugin {

  constructor(opts = {}) {
    super(opts);
    this.mod = 'webpack.DLLReferencePlugin';
    this.init();
  }
};
exports.default = DLLReferencePlugin;
;
module.exports = exports.default;