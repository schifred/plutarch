import { Mod } from '../Mod';

export default class CsvLoader extends Mod { 
  constructor(opts = {}){
    super(opts);
    this.init();
  };

  get dependencies(){
    return [
      this.mod, 
      'papaparse'
    ];
  };
};