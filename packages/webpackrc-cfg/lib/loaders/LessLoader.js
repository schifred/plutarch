'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let LessLoader = class LessLoader extends _Mod.Mod {

  constructor(opts = {}) {
    super(opts);
    this.defaultOptions = {
      javascriptEnabled: true, // 不加会报错 Inline JavaScript is not enabled. Is it set in your options?
      lint: false
    };
    this.init();
  }

  get dependencies() {
    return ['less', this.mod];
  }
};
exports.default = LessLoader;
;
module.exports = exports.default;