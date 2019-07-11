'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let FastSassLoader = class FastSassLoader extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.init();
  }

  get dependencies() {
    return [this.mod, 'node-sass'];
  }
};
exports.default = FastSassLoader;
;
module.exports = exports.default;