import EventEmitter from 'events';

import logger from '../logger';

class Compiler extends EventEmitter{
  constructor(options, context){
    super(options, context)
    this.options = options;
    this.context = context;
    this.compiler = options.getCompiler();
  }

  run(){
    logger.blue(`${this.constructor.name} begin to compile`);

    this.emit('start');

    this.compiler.run((err, stats) => {
      if ( err ){
        logger.red(`${this.constructor.name} compile failed`);
        this.emit('failed', err);
        return;
      };

      logger.blue(`${this.constructor.name} compile successful`);

      const log = stats.toString({
        colors: true
      });
      logger.log(log);

      this.emit('compiled');
    })
  }
};

export default Compiler;
