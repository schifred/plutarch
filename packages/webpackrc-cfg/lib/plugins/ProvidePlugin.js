'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let ProvidePlugin = class ProvidePlugin extends _Mod.Plugin {

  constructor(opts = {}) {
    super(opts);
    this.mod = 'webpack.ProvidePlugin';
    this.init();
  }
};
exports.default = ProvidePlugin;
;
module.exports = exports.default;