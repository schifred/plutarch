'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Mod = require('../Mod');

// https://github.com/crlang/easy-webpack-4/blob/master/webpack.config.js
let PostcssLoader = class PostcssLoader extends _Mod.Mod {

  constructor(opts = {}) {
    super(opts);
    this.defaultOptions = { // 如果没有 options 这个选项将会报错 No PostCSS Config found
      ident: 'postcss',
      plugins: [require('autoprefixer')("last 100 versions")]
    };
    this.init();
  }

  get dependencies() {
    return [this.mod, 'autoprefixer'];
  }
};
exports.default = PostcssLoader;
;
module.exports = exports.default;