import path from 'path';
import fs from 'fs';
import Command from 'common-bin';
import install from '../utils/install';
import copy from '../utils/copy';
import stringify from '../utils/stringify';
import Context from '../Context';
import BaseCompiler from '../webpack/BaseCompiler';
import * as constants from '../constants';

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
        description: 'docz server port'
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
    let prompts;
    if ( argv.build ){
      prompts = { cmd: 'build' };
    } else {
      prompts = { cmd: 'start' };
      // prompts = yield inquirer.prompt({
      //   type: 'list',
      //   name: 'cmd',
      //   message: "choice command",
      //   paginated: true,
      //   choices: [{ 
      //     name: 'start storybook', value: 'start' 
      //   }, {
      //     name: 'build storybook', value: 'build'
      //   }]
      // });
    };

    const installFlag = install([
      'typescript', 'react-docgen-typescript-loader', 
      'autoprefixer', '@storybook/core', '@storybook/react', 
      '@babel/runtime-corejs2', '@storybook/addon-actions', 
      '@storybook/addon-links', '@storybook/addon-info'
    ], { npm: argv.npm });
    if ( !installFlag ) return;

    const cfgDir = path.resolve(cwd, `./${argv.config}`);
    if ( !fs.existsSync(cfgDir) ) {
      fs.mkdirSync(cfgDir);
    };

    copy(
      path.resolve(__dirname, `../story/react.config.js`),
      path.resolve(cwd, `./${argv.config}/config.js`),
    );
    copy(
      path.resolve(__dirname, `../story/addon.js`),
      path.resolve(cwd, `./${argv.config}/addon.js`),
    );

    const webpackrc = path.resolve(cwd, `./${argv.config}/webpack.config.js`);
    if ( !fs.existsSync(webpackrc) ){
      const context = new Context();
      const configPath = fs.existsSync(path.resolve(cwd, constants.DevConfigPath)) ? 
        constants.DevConfigPath : constants.PlutarchConfigPath;
      const opts = require(path.resolve(cwd, configPath));// 客户配置
      const compiler = new BaseCompiler(opts, context);
      const webpackConfig = yield compiler.generate(prompts.cmd === 'start' ? 'development' : 'production');
      const jsloader = webpackConfig.module.rules[0];
      const lessloader = webpackConfig.module.rules[5].loader;

      fs.writeFileSync(webpackrc, 
`module.exports = ({config}) => {
  config.module.rules.shift();
  const jsloader = ${stringify(jsloader)};
  config.module.rules.unshift(jsloader);
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      ...jsloader.loader,
      {
        loader: "${require.resolve('ts-loader')}",
        options: {
          transpileOnly: true,
        },
      },
      require.resolve('react-docgen-typescript-loader'),
    ],
  });
  config.module.rules.push({
    test: /\.less$/,
    use: [
      "${require.resolve('style-loader')}", 
      ${stringify(lessloader[1])},
      { loader: "${require.resolve('postcss-loader')}", 
        options: {
          plugins: [require("autoprefixer")("last 100 versions")]
        },
      },
      "${require.resolve('less-loader')}"
    ],
  });
  config.resolve.alias = {
    ...config.resolve.alias, 
    ...${JSON.stringify(webpackConfig.resolve.alias)}
  };
  config.resolve.extensions = [
    ...config.resolve.extensions, 
    ...${JSON.stringify(webpackConfig.resolve.extensions)}
  ];
  return config;
};`);
    };

    const binPath = path.resolve(cwd, 
      `./node_modules/@storybook/react/bin/${prompts.cmd === 'start' ? 'index' : 'build'}.js`);
    const forkNodeArgv = this.helper.unparseArgv({
      port: argv.port,
      config: argv.config,
      'output-dir': argv.output
    });

    this.helper.forkNode(binPath, ['', ...forkNodeArgv], { 
      cwd: argv.cwd || cwd,
    });
  };

  get description() {
    return 'storybook';
  }
};

module.exports = StoryCommand;