import EventEmitter from 'events';
import { resolve } from 'path';
import { mkdirSync, existsSync, readFileSync } from 'fs';
import rimraf from 'rimraf';
import { webpack, getWebpackConfig } from 'webpackrc-cfg';
import VModulePlugin from 'vmodule-webpack-plugin';
import jsyaml from 'js-yaml';
import logger from '../logger';

class Compiler extends EventEmitter{
  constructor(options, context){
    super(options, context)
    this.options = options;
    this.context = context;
  }

  /**
   * 生成 webpack 配置
   * @param {string} mode 区分 build, server
   */
  async generate(mode = 'production'){
    let { options, context } = this;
    let webpackConfig;

    // 根据命令切换 mode
    const { env: { NODE_ENV, cwd }, argv, paths } = context;
    const ctx = { cwd, paths: { ...argv } };
    if ( NODE_ENV ) mode = NODE_ENV;

    const vmodulePlugin =  new VModulePlugin({
      name: 'configs',
      handler: function() {
        if ( !existsSync(paths.envConfig) ) return {};

        rimraf.sync(paths.tmpdir);
        mkdirSync(paths.tmpdir);
        return jsyaml.load(readFileSync(paths.envConfig));
      },
      watch: ['all'] 
    });
    let opts = {
      entry: {
        configs: vmodulePlugin.moduleFile
      },
      alias: {
        configs: vmodulePlugin.moduleFile
      },
      plugins: [ vmodulePlugin ]
    };
    if ( typeof options === 'object' ){
      opts.mode = options.mode || mode;
      webpackConfig = await getWebpackConfig({...options, ...opts}, ctx);
    } else if ( typeof options === 'function' ){
      opts.mode = mode;
      webpackConfig = await getWebpackConfig(opts, ctx);
      webpackConfig = options.call(context, webpackConfig);
    }

    return webpackConfig;
  }

  /**
   * 运行 webpack
   */
  async run(){
    const { paths } = this.context;
    const webpackConfig = await this.generate(true);
    const compiler = webpack(webpackConfig);

    logger.blue(`${this.constructor.name} begin to compile`);

    this.emit('start');

    compiler.run((err, stats) => {
      rimraf.sync(paths.tmpdir);

      if ( err ){
        logger.red('compile failed');
        this.emit('failed', err);
        return;
      };

      logger.blue('compile done');

      this.emit('compiled');
    })
  }
};

export default Compiler;
