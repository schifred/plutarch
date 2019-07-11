import { Mod } from '../Mod';

export default class VueLoader extends Mod {
  constructor(opts = {}){
    super(opts);
    this.init();
  };

  get dependencies(){
    return ['css-loader', this.mod];
  }; 
};