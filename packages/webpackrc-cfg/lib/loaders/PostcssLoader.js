"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Mod = require("../Mod");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// https://github.com/crlang/easy-webpack-4/blob/master/webpack.config.js
class PostcssLoader extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "defaultOptions", {
      // 如果没有 options 这个选项将会报错 No PostCSS Config found
      ident: 'postcss',
      plugins: [require('autoprefixer')("last 100 versions")]
    });

    this.init();
  }

  get dependencies() {
    return [this.mod, 'autoprefixer'];
  }

}

exports.default = PostcssLoader;
;
module.exports = exports.default;