import Chalk from 'chalk';

const chalk = new Chalk.constructor({ 
  level: 1 
});

/**
 * 控制台输出
 */
const Logger = {
  logger: console,

  setLogger: function(logger){
    this.logger = logger;
  },

  red: function(str, rtn){
    if ( rtn ) return chalk.red.bold(str);
    this.log(chalk.red.bold(str));
  },

  blue: function(str, rtn){
    if ( rtn ) return chalk.blue.bold(str);
    this.log(chalk.blue.bold(str));
  },

  green: function(str, rtn){
    if ( rtn ) return chalk.green.bold(str);
    this.log(chalk.green.bold(str));
  },

  dim: function(str, rtn){
    if ( rtn ) return chalk.dim.bold(str);
    this.log(chalk.dim.bold(str));
  },

  cyan: function(str, rtn){
    if ( rtn ) return chalk.cyan.bold(str);
    this.log(chalk.cyan.bold(str));
  },
  
  log: function(str){
    console.log(str);
  }
};

export default Logger;
