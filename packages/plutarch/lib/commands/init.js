'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _commonBin = require('common-bin');

var _commonBin2 = _interopRequireDefault(_commonBin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let InitCommand = class InitCommand extends _commonBin2.default {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {};
  }

  *run({ cwd, env, argv, rawArgv }) {
    const runInitPath = require.resolve("../exec/init.js");
    const forkNodeArgv = this.helper.unparseArgv(_extends({}, argv));

    this.helper.forkNode(runInitPath, forkNodeArgv, { cwd });
  }

  get description() {
    return 'choose type to initialize project';
  }
};
;

module.exports = InitCommand;