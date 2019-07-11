"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commonBin = require('common-bin');

var _commonBin2 = _interopRequireDefault(_commonBin);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let MainCommand = class MainCommand extends _commonBin2.default {
  constructor(rawArgv) {
    super(rawArgv);

    this.usage = 'Usage: plutarch <command> [options]';

    // load entire command directory
    this.load(_path2.default.join(__dirname, 'commands'));

    // more custom with `yargs` api, such as you can use `plutarch -V`
    this.yargs.alias('v', 'version');
  }

  get version() {
    return _package2.default.version || '1.0.0';
  }
};
exports.default = MainCommand;
module.exports = exports.default;