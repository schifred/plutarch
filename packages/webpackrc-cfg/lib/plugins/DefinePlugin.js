'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let DefinePlugin = class DefinePlugin extends _Mod.Plugin {

  constructor(opts = {}) {
    super(opts);
    this.mod = 'webpack.DefinePlugin';
    this.init();
  }
};
exports.default = DefinePlugin;
;
module.exports = exports.default;