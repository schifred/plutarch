import { Mod } from '../Mod';

export default class UrlLoader extends Mod {
  defaultOptions = {
    limit: 8192
  };

  constructor(opts = {}){
    super(opts);
    this.init();
  };
};