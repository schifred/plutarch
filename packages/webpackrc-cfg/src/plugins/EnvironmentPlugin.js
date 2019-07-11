import { Plugin } from '../Mod';

export default class EnvironmentPlugin extends Plugin {
  mod = 'webpack.EnvironmentPlugin';

  constructor(opts = {}){
    super(opts);
    this.init();
  }
};