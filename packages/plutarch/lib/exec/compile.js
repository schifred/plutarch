"use strict";

var _debug = _interopRequireDefault(require("debug"));

var _Context = _interopRequireDefault(require("../Context"));

var _BaseCompiler = _interopRequireDefault(require("../webpack/BaseCompiler"));

var _DevCompiler = _interopRequireDefault(require("../webpack/DevCompiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const context = new _Context.default();

const opts = require(context.paths.plrc); // 客户配置


const Compiler = context.isBuild ? _BaseCompiler.default : _DevCompiler.default;
const compiler = new Compiler(opts, context);
compiler.run();