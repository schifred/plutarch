'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let EnvironmentPlugin = class EnvironmentPlugin extends _Mod.Plugin {

  constructor(opts = {}) {
    super(opts);
    this.mod = 'webpack.EnvironmentPlugin';
    this.init();
  }
};
exports.default = EnvironmentPlugin;
;
module.exports = exports.default;