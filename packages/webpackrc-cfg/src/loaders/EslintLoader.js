import eslintFormatter from 'react-dev-utils/eslintFormatter';
import { Mod } from '../Mod';

export default class EslintLoader extends Mod { 
  defaultOptions = {
    formatter: eslintFormatter,
    useEslintrc: false,
    baseConfig: {
      extends: [ require.resolve('eslint-config-react-app') ],
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
      'eslint-config-react-app', 
      'eslint-plugin-flowtype',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react',
      'eslint-plugin-import'
    ];
  };
};