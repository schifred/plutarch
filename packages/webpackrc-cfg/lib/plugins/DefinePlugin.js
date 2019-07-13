"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Mod = require("../Mod");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DefinePlugin extends _Mod.Plugin {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "mod", 'webpack.DefinePlugin');

    this.init();
  }

}

exports.default = DefinePlugin;
;
module.exports = exports.default;