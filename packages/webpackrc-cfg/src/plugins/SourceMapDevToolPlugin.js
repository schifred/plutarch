import { Plugin } from '../Mod';

export default class SourceMapDevToolPlugin extends Plugin {
  mod = 'webpack.SourceMapDevToolPlugin';

  constructor(opts = {}){
    super(opts);
    this.init();
  }
};