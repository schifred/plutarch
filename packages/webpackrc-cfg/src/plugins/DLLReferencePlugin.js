import { Plugin } from '../Mod';

export default class DLLReferencePlugin extends Plugin {
  mod = 'webpack.DLLReferencePlugin';

  constructor(opts = {}){
    super(opts);
    this.init();
  }
};