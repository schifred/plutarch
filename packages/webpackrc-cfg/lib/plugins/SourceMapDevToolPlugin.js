'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let SourceMapDevToolPlugin = class SourceMapDevToolPlugin extends _Mod.Plugin {

  constructor(opts = {}) {
    super(opts);
    this.mod = 'webpack.SourceMapDevToolPlugin';
    this.init();
  }
};
exports.default = SourceMapDevToolPlugin;
;
module.exports = exports.default;