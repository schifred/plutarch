import EventEmitter from 'events';
import { webpack, getWebpackConfig } from 'webpackrc-cfg';
import logger from '../logger';
import { install } from '../utils';

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

    install('plutarch', { 
      cwd,
      npm: options.npm
    });

    if ( typeof options === 'object' ){
      options.mode = mode;
      options.installMode = false;
      webpackConfig = await getWebpackConfig(options, ctx, false);
    } else if ( typeof options === 'function' ){
      webpackConfig = await getWebpackConfig({ mode }, ctx, false);
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
        logger.red('compile failed');
        this.emit('failed', err);
        return;
      };

      // const log = stats.toString({
      //   colors: true
      // });
      // logger.log(log);

      logger.blue('compile done');

      this.emit('compiled');
    })
  }
};

export default Compiler;
