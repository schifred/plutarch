'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let ModuleConcatenationPlugin = class ModuleConcatenationPlugin extends _Mod.Plugin {

  constructor(opts = {}) {
    super(opts);
    this.mod = 'webpack.optimize.ModuleConcatenationPlugin';
    this.init();
  }
};
exports.default = ModuleConcatenationPlugin;
;
module.exports = exports.default;