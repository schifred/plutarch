"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Mod = require("../Mod");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Webpackbar extends _Mod.Plugin {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "defaultOptions", {
      color: 'green',
      profile: true
    });
  }

}

exports.default = Webpackbar;
;
module.exports = exports.default;