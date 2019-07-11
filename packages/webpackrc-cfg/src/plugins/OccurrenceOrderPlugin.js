import { Plugin } from '../Mod';

export default class OccurrenceOrderPlugin extends Plugin {
  mod = 'webpack.optimize.OccurrenceOrderPlugin';

  constructor(opts = false){
    super(opts);
    this.init();
  }
};