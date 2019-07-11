import { Plugin } from '../Mod';

export default class ProvidePlugin extends Plugin {
  mod = 'webpack.ProvidePlugin';

  constructor(opts = {}){
    super(opts);
    this.init();
  }
};