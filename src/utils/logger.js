'use strict';

let chalk = require("chalk");chalk
chalk = new chalk.constructor({level: 1})

const Logger = {
  logger: console,
  setLogger: function(logger){
    this.logger = logger;
  },
  red: function(str){
    console.log(chalk.red.bold(str));
  },
  blue: function(str){
    this.log(chalk.blue.bold(str));
  },
  green: function(str){
    this.log(chalk.green.bold(str));
  },
  log: function(str){
    console.log(str);
  }
};

module.exports = Logger
