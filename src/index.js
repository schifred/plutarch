"use strict";

import path from 'path';
import Command from 'common-bin';
import pkg from '../package.json';

class MainCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.usage = 'Usage: plutarch <command> [options]';

    // load entire command directory
    this.load(path.join(__dirname, 'commands'));

    // or load special command file
    // this.add(path.join(__dirname, 'test_command.js'));

    // more custom with `yargs` api, such as you can use `plutarch -V`
    this.yargs.alias('v', 'version');
  }

  get version() {
    return pkg.version || '1.0.0';
  }
}

export default MainCommand;
