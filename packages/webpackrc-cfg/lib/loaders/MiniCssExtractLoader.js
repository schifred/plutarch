'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let MiniCssExtractLoader = class MiniCssExtractLoader extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = 'mini-css-extract-plugin.loader';
    this.init();
  }
};
exports.default = MiniCssExtractLoader;
;
module.exports = exports.default;