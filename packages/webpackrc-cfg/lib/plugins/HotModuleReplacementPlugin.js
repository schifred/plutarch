'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let HotModuleReplacementPlugin = class HotModuleReplacementPlugin extends _Mod.Plugin {

  constructor(opts = {}) {
    super(opts);
    this.mod = 'webpack.HotModuleReplacementPlugin';
    this.init();
  }
};
exports.default = HotModuleReplacementPlugin;
;
module.exports = exports.default;