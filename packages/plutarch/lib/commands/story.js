"use strict";

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _commonBin = _interopRequireDefault(require("common-bin"));

var _install = _interopRequireDefault(require("../utils/install"));

var _copy = _interopRequireDefault(require("../utils/copy"));

var _stringify = _interopRequireDefault(require("../utils/stringify"));

var _Context = _interopRequireDefault(require("../Context"));

var _BaseCompiler = _interopRequireDefault(require("../webpack/BaseCompiler"));

var constants = _interopRequireWildcard(require("../constants"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StoryCommand extends _commonBin.default {
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

  *run({
    cwd,
    env,
    argv,
    rawArgv
  }) {
    let prompts;

    if (argv.build) {
      prompts = {
        cmd: 'build'
      };
    } else {
      prompts = {
        cmd: 'start'
      };
    }

    ;
    const installFlag = (0, _install.default)(['typescript', 'react-docgen-typescript-loader', 'autoprefixer', '@storybook/core', '@storybook/react', '@babel/runtime-corejs2', '@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-info'], {
      npm: argv.npm
    });
    if (!installFlag) return;

    const cfgDir = _path.default.resolve(cwd, `./${argv.config}`);

    if (!_fs.default.existsSync(cfgDir)) {
      _fs.default.mkdirSync(cfgDir);
    }

    ;
    (0, _copy.default)(_path.default.resolve(__dirname, `../story/react.config.js`), _path.default.resolve(cwd, `./${argv.config}/config.js`));
    (0, _copy.default)(_path.default.resolve(__dirname, `../story/addon.js`), _path.default.resolve(cwd, `./${argv.config}/addon.js`));

    const webpackrc = _path.default.resolve(cwd, `./${argv.config}/webpack.config.js`);

    if (!_fs.default.existsSync(webpackrc)) {
      const context = new _Context.default();
      const configPath = _fs.default.existsSync(_path.default.resolve(cwd, constants.DevConfigPath)) ? constants.DevConfigPath : constants.PlutarchConfigPath;

      const opts = require(_path.default.resolve(cwd, configPath)); // 客户配置


      const compiler = new _BaseCompiler.default(opts, context);
      const webpackConfig = yield compiler.generate(prompts.cmd === 'start' ? 'development' : 'production');
      const jsloader = webpackConfig.module.rules[0];
      const lessloader = webpackConfig.module.rules[5].loader;

      _fs.default.writeFileSync(webpackrc, `module.exports = ({config}) => {
  config.module.rules.shift();
  const jsloader = ${(0, _stringify.default)(jsloader)};
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
      ${(0, _stringify.default)(lessloader[1])},
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
    }

    ;

    const binPath = _path.default.resolve(cwd, `./node_modules/@storybook/react/bin/${prompts.cmd === 'start' ? 'index' : 'build'}.js`);

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

}

;
module.exports = StoryCommand;