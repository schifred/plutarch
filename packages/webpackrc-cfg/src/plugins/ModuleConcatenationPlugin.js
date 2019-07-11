import { Plugin } from '../Mod';

export default class ModuleConcatenationPlugin extends Plugin { 
  mod = 'webpack.optimize.ModuleConcatenationPlugin';

  constructor(opts = {}){
    super(opts);
    this.init();
  }
};