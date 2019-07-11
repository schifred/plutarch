import { Plugin } from '../Mod';

export default class DefinePlugin extends Plugin {
  mod = 'webpack.DefinePlugin';

  constructor(opts = {}){
    super(opts);
    this.init();
  }
};