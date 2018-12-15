import debug from 'debug';

import Context from '../Context';
import Compiler from '../compiler/Compiler';
import DevCompiler from '../compiler/DevCompiler';
import DllCompiler from '../compiler/DllCompiler';

const _debug = debug('plutarch');

const context = new Context();
const opts = require(context.paths.plrc);// 客户配置
const sCompiler = context.isBuild ? Compiler : DevCompiler;
const compiler = new sCompiler(opts, context);
let dllOptions;
let dllCompiler;

// if ( opts && opts.dll ){
//   dllCompiler = new DllCompiler(opts.dll, context);

//   dllCompiler.on('compiled', () => {
//     dllCompiler.injectDllReferencePlugin(options);
//     compiler.run();
//   });

//   dllCompiler.run();
// }else{
  compiler.run();
// };