import { Mod } from '../Mod';

// https://www.jianshu.com/p/98404525793c?utm_source=oschina-app
export default class CssLoader extends Mod {
  defaultOptions = {
    modules: true,
    camelCase: true,
    localIdentName: '[local]'
  };

  constructor(opts = {}){
    super(opts);
    this.init();
  };
};