import { existsSync } from 'fs';
import { override } from 'core-decorators';
import webpack from 'webpack';

import Compiler from './Compiler';
import logger from '../utils/logger';

class DllCompiler extends Compiler {
  @override
  run(){
    const manifestPath = this.options.getManifestPath();
    if ( !existsSync(manifestPath) ){
      super.run();
    } else {
      this.emit('compiled');
    };
  }

  injectDllReferencePlugin(options){
    const manifestPath = this.options.getManifestPath();
    const { context, config } = options;
    const { paths: { src } } = context; 
    let { plugins = {} } = options.config;

    plugins['dllReferencePlugin'] = {
      Constructor: webpack.DllReferencePlugin,
      args: [{
        context: src,
        manifest: manifestPath
      }]
    };
  }
}

export default DllCompiler;