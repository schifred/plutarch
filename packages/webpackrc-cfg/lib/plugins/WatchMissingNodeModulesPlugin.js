'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

let WatchMissingNodeModulesPlugin = class WatchMissingNodeModulesPlugin extends _Mod.Plugin {

  constructor(opts = {}) {
    super(opts);
    this.mod = 'react-dev-utils/WatchMissingNodeModulesPlugin';
    this.init();
  }
};
exports.default = WatchMissingNodeModulesPlugin;
;
module.exports = exports.default;