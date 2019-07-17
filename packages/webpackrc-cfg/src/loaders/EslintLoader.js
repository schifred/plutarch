import { Mod } from '../Mod';

export default class EslintLoader extends Mod { 
  defaultOptions = {
    baseConfig: {
      extends: [ require.resolve('eslint-config-alloy/react') ],
    }
  };

  constructor(opts = {}){
    super(opts);
    this.init();
  };

  get dependencies(){
    return [
      this.mod, 
      'eslint', 
      'babel-eslint', 
      'eslint-config-alloy',
    ];
  };
};