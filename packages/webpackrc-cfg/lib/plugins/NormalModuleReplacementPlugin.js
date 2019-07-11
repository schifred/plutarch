'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let NormalModuleReplacementPlugin = class NormalModuleReplacementPlugin extends _Mod.Plugin {

  constructor(opts = {}) {
    super(opts);
    this.mod = 'webpack.NormalModuleReplacementPlugin';
    this.init();
  }
};
exports.default = NormalModuleReplacementPlugin;
;
module.exports = exports.default;