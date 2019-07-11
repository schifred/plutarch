import { Mod } from '../Mod';

export default class TsLoader extends Mod {
  defaultOptions = {
    transpileOnly: true
  };

  constructor(opts = {}){
    super(opts);
    this.init();
  };
};