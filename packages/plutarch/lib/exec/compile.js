'use strict';

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _BaseCompiler = require('../webpack/BaseCompiler');

var _BaseCompiler2 = _interopRequireDefault(_BaseCompiler);

var _DevCompiler = require('../webpack/DevCompiler');

var _DevCompiler2 = _interopRequireDefault(_DevCompiler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const context = new _Context2.default();
const opts = require(context.paths.plrc); // 客户配置
const Compiler = context.isBuild ? _BaseCompiler2.default : _DevCompiler2.default;
const compiler = new Compiler(opts, context);

compiler.run();