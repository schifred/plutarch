import path from 'path';
import Command from 'common-bin';
import { sync as resolveBin } from 'resolve-bin';
import install from '../utils/install';

class DoczCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {
      port: {
        type: 'number',
        default: 8001,
        alias: 'p',
        description: 'docz server port'
      },
      config: {
        type: 'string',
        default: path.resolve(__dirname, '../docz/doczrc.js'),
        alias: 'c',
        description: 'config'
      },
      npm: {
        type: 'string',
        default: 'npm',
        alias: 'n',
        description: 'npm'
      },
    };
  }

  * run({ cwd, env, argv, rawArgv }) {
    install('docz', { npm: argv.npm });
    install('docz-theme-default', { npm: argv.npm });
    const binPath = resolveBin('docz');
    const forkNodeArgv = this.helper.unparseArgv({
      port: argv.port,
      config: argv.config,
    });

    this.helper.forkNode(binPath, [...rawArgv, ...forkNodeArgv], { 
      cwd
    });
  }

  get description() {
    return 'docz';
  }
};

module.exports = DoczCommand;
