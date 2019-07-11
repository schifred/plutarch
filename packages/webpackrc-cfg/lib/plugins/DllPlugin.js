'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let DllPlugin = class DllPlugin extends _Mod.Plugin {

  constructor(opts = {}) {
    super(opts);
    this.mod = 'webpack.DllPlugin';
    this.init();
  }
};
exports.default = DllPlugin;
;
module.exports = exports.default;