"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _commonBin = _interopRequireDefault(require("common-bin"));

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MainCommand extends _commonBin.default {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: plutarch <command> [options]'; // load entire command directory

    this.load(_path.default.join(__dirname, 'commands')); // more custom with `yargs` api, such as you can use `plutarch -V`

    this.yargs.alias('v', 'version');
  }

  get version() {
    return _package.default.version || '1.0.0';
  }

}

var _default = MainCommand;
exports.default = _default;
module.exports = exports.default;