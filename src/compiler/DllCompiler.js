import { existsSync } from 'fs';
import { override } from 'core-decorators';
import webpack from 'webpack';

import Compiler from './Compiler';
import logger from '../logger';

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
    this.options.injectDllReferencePlugin(options);
  }
}

export default DllCompiler;