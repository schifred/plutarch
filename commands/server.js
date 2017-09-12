"use strict";

const Command = require('common-bin');
const path = require('path');

class ServerCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {
      port: {
        type: 'number',
        default: 3001,
        description: 'the port',
      },
    };
  }

  * run({ argv }) {
    //console.log('git clone %s to %s with depth %d', argv._[0], argv._[1], argv.depth);
    const runServerPath = path.join(__dirname, "../src/runServer.js");
    this.helper.forkNode(runServerPath,[""],{
      cwd: process.cwd
    });
  }

  get description() {
    return 'Create locale';
  }
}

module.exports = ServerCommand;
