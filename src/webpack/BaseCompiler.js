import EventEmitter from 'events';
import webpack from 'webpack';
import logger from '../logger';
import { getWebpackConfig } from 'webpackrc-cfg';

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
    const { env: { NODE_ENV, cwd }, argv } = context;
    const ctx = { cwd, paths: { ...argv } };
    if ( NODE_ENV ) mode = NODE_ENV;

    if ( typeof options === 'object' ){
      options.mode = mode;
      webpackConfig = await getWebpackConfig(options, ctx);
    } else if ( typeof options === 'function' ){
      webpackConfig = await getWebpackConfig({ mode }, ctx);
      webpackConfig = options.call(context, webpackConfig);
    }

    return webpackConfig;
  }

  /**
   * 运行 webpack
   */
  async run(){
    const webpackConfig = await this.generate(true);
    const compiler = webpack(webpackConfig);

    logger.blue(`${this.constructor.name} begin to compile`);

    this.emit('start');

    compiler.run((err, stats) => {
      if ( err ){
        logger.red(`${this.constructor.name} compile failed`);
        this.emit('failed', err);
        return;
      };

      const log = stats.toString({
        colors: true
      });
      logger.log(log);

      logger.blue(`${this.constructor.name} done`);

      this.emit('compiled');
    })
  }
};

export default Compiler;
