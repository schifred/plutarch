import { Mod } from '../Mod';

export default class SvgSpriteLoader extends Mod {
  defaultOptions = {
    symbolId: 'icon-[name]'
  };

  constructor(opts = {}){
    super(opts);
    this.init();
  };
};