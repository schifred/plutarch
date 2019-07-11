import { Plugin } from '../Mod';

export default class HotModuleReplacementPlugin extends Plugin { 
  mod = 'webpack.HotModuleReplacementPlugin';

  constructor(opts = {}){
    super(opts);
    this.init();
  }
};