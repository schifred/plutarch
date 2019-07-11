import { Plugin } from '../Mod';

export default class NormalModuleReplacementPlugin extends Plugin {
  mod = 'webpack.NormalModuleReplacementPlugin';

  constructor(opts = {}){
    super(opts);
    this.init();
  }
};