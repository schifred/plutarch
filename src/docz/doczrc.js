import { css } from 'docz-plugin-css-temp';
import Context from '../Context';

const cssModuleRegex = /\.module\.css$/;
const lessModuleRegex = /\.module\.less$/;

const context = new Context();
const opts = require(context.paths.plrc);// 客户配置

export default {
  modifyBundlerConfig(config, dev, args) {
    // do not generate doc sourcemap
    config.devtool = false;

    // support disable minimize via process.env.COMPRESS
    if (process.env.COMPRESS === 'none') {
      config.optimization.minimize = false;
    }
    return config;
  },
  modifyBabelRc(babelrc){
    if ( opts.module && opts.module.babel && opts.module.babel.plugins ) 
      babelrc.plugins = [...(babelrc.plugins || []), ...opts.module.babel.plugins];
    return babelrc;
  },
  plugins: [
    // .css
    css({
      preprocessor: 'postcss',
      ruleOpts: {
        exclude: cssModuleRegex,
      },
      cssmodules: false,
    }),
    css({
      preprocessor: 'postcss',
      ruleOpts: {
        test: cssModuleRegex,
      },
      cssmodules: true,
    }),

    // .less
    css({
      preprocessor: 'less',
      ruleOpts: {
        exclude: lessModuleRegex,
      },
      cssmodules: false,
      loaderOpts: {
        javascriptEnabled: true,
      },
    }),
    css({
      preprocessor: 'less',
      ruleOpts: {
        test: lessModuleRegex,
      },
      cssmodules: true,
      loaderOpts: {
        javascriptEnabled: true,
      },
    }),
  ],
};
