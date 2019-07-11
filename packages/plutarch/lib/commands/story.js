'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _commonBin = require('common-bin');

var _commonBin2 = _interopRequireDefault(_commonBin);

var _install = require('../utils/install');

var _install2 = _interopRequireDefault(_install);

var _copy = require('../utils/copy');

var _copy2 = _interopRequireDefault(_copy);

var _stringify = require('../utils/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _BaseCompiler = require('../webpack/BaseCompiler');

var _BaseCompiler2 = _interopRequireDefault(_BaseCompiler);

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let StoryCommand = class StoryCommand extends _commonBin2.default {
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
      }
    };
  }

  *run({ cwd, env, argv, rawArgv }) {
    let prompts;
    if (argv.build) {
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

    const installFlag = (0, _install2.default)(['typescript', 'react-docgen-typescript-loader', 'autoprefixer', '@storybook/core', '@storybook/react', '@babel/runtime-corejs2', '@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-info'], { npm: argv.npm });
    if (!installFlag) return;

    const cfgDir = _path2.default.resolve(cwd, `./${argv.config}`);
    if (!_fs2.default.existsSync(cfgDir)) {
      _fs2.default.mkdirSync(cfgDir);
    };

    (0, _copy2.default)(_path2.default.resolve(__dirname, `../story/react.config.js`), _path2.default.resolve(cwd, `./${argv.config}/config.js`));
    (0, _copy2.default)(_path2.default.resolve(__dirname, `../story/addon.js`), _path2.default.resolve(cwd, `./${argv.config}/addon.js`));

    const webpackrc = _path2.default.resolve(cwd, `./${argv.config}/webpack.config.js`);
    if (!_fs2.default.existsSync(webpackrc)) {
      const context = new _Context2.default();
      const configPath = _fs2.default.existsSync(_path2.default.resolve(cwd, constants.DevConfigPath)) ? constants.DevConfigPath : constants.PlutarchConfigPath;
      const opts = require(_path2.default.resolve(cwd, configPath)); // 客户配置
      const compiler = new _BaseCompiler2.default(opts, context);
      const webpackConfig = yield compiler.generate(prompts.cmd === 'start' ? 'development' : 'production');
      const jsloader = webpackConfig.module.rules[0];
      const lessloader = webpackConfig.module.rules[5].loader;

      _fs2.default.writeFileSync(webpackrc, `module.exports = ({config}) => {
  config.module.rules.shift();
  const jsloader = ${(0, _stringify2.default)(jsloader)};
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
      ${(0, _stringify2.default)(lessloader[1])},
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

    const binPath = _path2.default.resolve(cwd, `./node_modules/@storybook/react/bin/${prompts.cmd === 'start' ? 'index' : 'build'}.js`);
    const forkNodeArgv = this.helper.unparseArgv({
      port: argv.port,
      config: argv.config,
      'output-dir': argv.output
    });

    this.helper.forkNode(binPath, ['', ...forkNodeArgv], {
      cwd: argv.cwd || cwd
    });
  }

  get description() {
    return 'storybook';
  }
};
;

module.exports = StoryCommand;