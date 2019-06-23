import path from 'path';
import fs from 'fs';
import Command from 'common-bin';
import inquirer from 'inquirer';
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
      npm: {
        type: 'string',
        default: 'npm',
        alias: 'n',
        description: 'npm'
      },
    };
  }

  * run({ cwd, env, argv, rawArgv }) {
    const prompts = yield inquirer.prompt({
      type: 'list',
      name: 'cmd',
      message: "choice command",
      paginated: true,
      choices: [{ 
        name: 'start storybook', value: 'start' 
      }, {
        name: 'build storybook', value: 'build'
      }]
    });

    install([
      'babel-loader', '@babel/core', 'ts-loader', 'react-docgen-typescript-loader',
      'style-loader', 'less-loader', 'less', '@storybook/react', '@babel/runtime-corejs2',
      '@storybook/addon-actions', '@storybook/addon-links'
    ], { npm: argv.npm });

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

      fs.writeFileSync(webpackrc, 
`module.exports = ({config}) => {
  config.module.rules.shift();
  config.module.rules.unshift(${stringify(jsloader)});
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
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
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
        },
      },
    ],
  });
  config.resolve.alias = {
    ...config.resolve.alias, 
    ...${JSON.stringify(webpackConfig.resolve.alias)}
  };
  return config;
};`);
    };

    const binPath = path.resolve(cwd, 
      `./node_modules/@storybook/react/bin/${prompts.cmd === 'start' ? 'index' : 'build'}.js`);
    const forkNodeArgv = this.helper.unparseArgv({
      port: argv.port,
      config: argv.config,
    });

    this.helper.forkNode(binPath, ['', ...forkNodeArgv], { 
      cwd
    });
  };

  get description() {
    return 'storybook';
  }
};

module.exports = StoryCommand;
