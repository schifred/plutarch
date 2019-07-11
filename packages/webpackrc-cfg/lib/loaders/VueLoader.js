'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let VueLoader = class VueLoader extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.init();
  }

  get dependencies() {
    return ['css-loader', this.mod];
  }
};
exports.default = VueLoader;
;
module.exports = exports.default;