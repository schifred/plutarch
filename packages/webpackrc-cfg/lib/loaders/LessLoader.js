"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Mod = require("../Mod");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class LessLoader extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "defaultOptions", {
      javascriptEnabled: true,
      // 不加会报错 Inline JavaScript is not enabled. Is it set in your options?
      lint: false
    });

    this.init();
  }

  get dependencies() {
    return ['less', this.mod];
  }

}

exports.default = LessLoader;
;
module.exports = exports.default;