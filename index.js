"use strict";

const path = require('path');
const Command = require('common-bin');
const pkg = require('./package.json');

class MainCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.usage = 'Usage: plutarch <command> [options]';

    // load entire command directory
    this.load(path.join(__dirname, 'commands'));

    // or load special command file
    // this.add(path.join(__dirname, 'test_command.js'));

    // more custom with `yargs` api, such as you can use `plutarch -V`
    this.yargs.alias('V', 'version');
  }

  get version() {
    return 'v1.0.0';
  }
}

module.exports = MainCommand;
