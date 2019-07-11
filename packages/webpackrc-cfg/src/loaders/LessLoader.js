import { Mod } from '../Mod';

export default class LessLoader extends Mod {
  defaultOptions = {
    javascriptEnabled: true,// 不加会报错 Inline JavaScript is not enabled. Is it set in your options?
    lint: false
  };

  constructor(opts = {}){
    super(opts);
    this.init();
  };

  get dependencies(){
    return ['less', this.mod];
  }; 
};