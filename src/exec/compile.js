import debug from 'debug';
import Context from '../Context';
import BaseCompiler from '../webpack/BaseCompiler';
import DevCompiler from '../webpack/DevCompiler';

const context = new Context();
const opts = require(context.paths.plrc);// 客户配置
const Compiler = context.isBuild ? BaseCompiler : DevCompiler;
const compiler = new Compiler(opts, context);

compiler.run();