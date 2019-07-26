import path from 'path';
import Command from 'common-bin';

class StoryCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {
      cwd: {
        type: 'string',
        description: 'process cwd'
      },
      port: {
        type: 'number',
        default: 8001,
        alias: 'p',
        description: 'story server port'
      },
      config: {
        type: 'string',
        default: '.storybook',
        alias: 'c',
        description: 'config'
      },
      output: {
        type: 'string',
        default: 'docs',
        alias: 'o',
        description: 'output'
      },
      npm: {
        type: 'string',
        default: 'npm',
        alias: 'n',
        description: 'npm'
      },
      build: {
        type: 'boolean',
        default: false,
        alias: 'b',
        description: 'build'
      },
    };
  }

  * run({ cwd, env, argv, rawArgv }) {
    const runStoryPath = require.resolve("../exec/story.js");
    const forkNodeArgv = this.helper.unparseArgv(argv);
    console.log(111)

    this.helper.forkNode(runStoryPath, forkNodeArgv, { 
      ...argv,
      cwd: argv.cwd || cwd,
      env: {
        "NODE_ENV": "development",
        environment: argv.build ? 'prod' : 'dev',
        "TMPDIR": path.resolve(cwd, '.tmpdir')
      }
    });
  };

  get description() {
    return 'storybook';
  }
};

module.exports = StoryCommand;