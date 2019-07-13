"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Mod = require("../Mod");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class HotModuleReplacementPlugin extends _Mod.Plugin {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "mod", 'webpack.HotModuleReplacementPlugin');

    this.init();
  }

}

exports.default = HotModuleReplacementPlugin;
;
module.exports = exports.default;