import { Mod } from '../Mod';

export default class MiniCssExtractLoader extends Mod {
  mod = 'mini-css-extract-plugin.loader'
  constructor(opts = {}){
    super(opts);
    this.init();
  };
};