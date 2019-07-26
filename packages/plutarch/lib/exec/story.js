"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _debug = _interopRequireDefault(require("debug"));

var _execa = _interopRequireDefault(require("execa"));

var _child_process = _interopRequireDefault(require("child_process"));

var _dargs = _interopRequireDefault(require("dargs"));

var _Context = _interopRequireDefault(require("../Context"));

var _BaseCompiler = _interopRequireDefault(require("../webpack/BaseCompiler"));

var _install = _interopRequireDefault(require("../utils/install"));

var _copy = _interopRequireDefault(require("../utils/copy"));

var _stringify = _interopRequireDefault(require("../utils/stringify"));

var _fork = _interopRequireDefault(require("../utils/fork"));

var constants = _interopRequireWildcard(require("../constants"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function run() {
  return _run.apply(this, arguments);
}

function _run() {
  _run = _asyncToGenerator(function* () {
    const ctx = new _Context.default();
    const {
      cwd
    } = ctx.env;
    const {
      npm,
      config,
      build,
      port,
      output
    } = ctx.argv;
    const installFlag = (0, _install.default)(['typescript', 'react-docgen-typescript-loader', 'autoprefixer', '@storybook/core', '@storybook/react', '@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-info'], {
      npm
    });
    if (!installFlag) return;

    const cfgDir = _path.default.resolve(cwd, `./${config}`);

    if (!_fs.default.existsSync(cfgDir)) {
      _fs.default.mkdirSync(cfgDir);
    }

    ;
    (0, _copy.default)(_path.default.resolve(__dirname, `../story/react.config.js`), _path.default.resolve(cwd, `./${config}/config.js`));
    (0, _copy.default)(_path.default.resolve(__dirname, `../story/addon.js`), _path.default.resolve(cwd, `./${config}/addon.js`));

    const webpackrc = _path.default.resolve(cwd, `./${config}/webpack.config.js`);

    const opts = require(ctx.paths.plrc); // 客户配置


    const compiler = new _BaseCompiler.default(opts, ctx);
    const webpackConfig = yield compiler.generate(!build ? 'development' : 'production');
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

    const binPath = _path.default.resolve(cwd, `./node_modules/@storybook/react/bin/${!build ? 'index' : 'build'}.js`);

    const forkNodeArgv = [...new Set((0, _dargs.default)({
      port,
      config,
      'output-dir': output
    }))];
    (0, _fork.default)(binPath, ['', ...forkNodeArgv], {
      cwd
    });
  });
  return _run.apply(this, arguments);
}

run();