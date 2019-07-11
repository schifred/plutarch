'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let SvgSpriteLoader = class SvgSpriteLoader extends _Mod.Mod {

  constructor(opts = {}) {
    super(opts);
    this.defaultOptions = {
      symbolId: 'icon-[name]'
    };
    this.init();
  }
};
exports.default = SvgSpriteLoader;
;
module.exports = exports.default;