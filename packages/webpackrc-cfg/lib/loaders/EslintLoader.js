"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Mod = require("../Mod");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class EslintLoader extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "defaultOptions", {
      baseConfig: {
        extends: [require.resolve('eslint-config-alloy/react')]
      }
    });

    this.init();
  }

  get dependencies() {
    return [this.mod, 'eslint', 'babel-eslint', 'eslint-config-alloy'];
  }

}

exports.default = EslintLoader;
;
module.exports = exports.default;