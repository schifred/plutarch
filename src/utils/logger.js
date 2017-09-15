'use strict';

const chalk = require("chalk");

const Logger = {
  logger: console,
  setLogger: function(logger){
    this.logger = logger;
  },
  red: function(str){
    this.log(chalk.red(str));
  },
  blue: function(str){
    this.log(chalk.blue(str));
  },
  green: function(str){
    this.log(chalk.green(str));
  },
  log: function(str){
    this.logger.log(str);
  }
};

module.exports = Logger
