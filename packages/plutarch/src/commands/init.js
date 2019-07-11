import Command from 'common-bin';

class InitCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {};
  }

  * run({ cwd, env, argv, rawArgv }) {
    const runInitPath = require.resolve("../exec/init.js");
    const forkNodeArgv = this.helper.unparseArgv({
      ...argv
    });

    this.helper.forkNode(runInitPath, forkNodeArgv, { cwd });
  }

  get description() {
    return 'choose type to initialize project';
  }
};

module.exports = InitCommand;
