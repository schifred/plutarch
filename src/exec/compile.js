import debug from 'debug';

import Context from '../Context';
import Options from '../webpack/Options';
import DevCompiler from '../compiler/DevCompiler';
import ProdCompiler from '../compiler/ProdCompiler';
import DllOptions from '../webpack/DllOptions';
import DllCompiler from '../compiler/DllCompiler';

const _debug = debug('plutarch');

const context = new Context();
const opts = require(context.paths.plrc);// 客户配置

let options = new Options(opts, context);
const Compiler = context.isBuild ? ProdCompiler : DevCompiler;
const compiler = new Compiler(options, context);
let dllOptions;
let dllCompiler;

if ( opts && opts.dll ){
  dllOptions = new DllOptions(opts, context);
  dllCompiler = new DllCompiler(dllOptions, context);

  dllCompiler.on('compiled', () => {
    dllCompiler.injectDllReferencePlugin(options);
    compiler.run();
  });

  dllCompiler.run();
}else{
  compiler.run();
};