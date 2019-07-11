import { Mod } from '../Mod';

// https://github.com/crlang/easy-webpack-4/blob/master/webpack.config.js
export default class PostcssLoader extends Mod {
  defaultOptions = {// 如果没有 options 这个选项将会报错 No PostCSS Config found
    ident: 'postcss',
    plugins: [
      require('autoprefixer')("last 100 versions")
    ]
  };

  constructor(opts = {}){
    super(opts);
    this.init();
  };

  get dependencies(){
    return [this.mod, 'autoprefixer'];
  };
};