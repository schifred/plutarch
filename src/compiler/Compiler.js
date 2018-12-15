import EventEmitter from 'events';
import webpack from 'webpack';
import logger from '../logger';
import getWebpackConfig from '../utils/getWebpackConfig';

class Compiler extends EventEmitter{
  constructor(options, context){
    super(options, context)
    this.options = options;
    this.context = context;
  }

  async generate(mode, ...args){
    const { options, context } = this;
    const webpackConfig = await getWebpackConfig(options, context, mode, ...args);
    return webpackConfig;
  }

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
