import { Plugin } from '../Mod';

export default class DllPlugin extends Plugin {
  mod = 'webpack.DllPlugin';

  constructor(opts = {}){
    super(opts);
    this.init();
  }
};