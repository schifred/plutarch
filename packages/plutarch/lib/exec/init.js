"use strict";

var _debug2 = _interopRequireDefault(require("debug"));

var _path = require("path");

var _fs = require("fs");

var _shelljs = _interopRequireDefault(require("shelljs"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _lodash = require("lodash");

var _logger = _interopRequireDefault(require("../logger"));

var _Context = _interopRequireDefault(require("../Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const _debug = (0, _debug2.default)('plutarch');

const context = new _Context.default();
const {
  paths: {
    app,
    tpls
  }
} = context;

_inquirer.default.prompt([{
  type: 'list',
  name: 'type',
  message: 'which project do you want to initilize?',
  choices: ['dva', 'redux', 'mobx', 'lib']
}, {
  type: 'input',
  name: 'name',
  message: `project name: `,
  default: (0, _path.basename)(app)
}, {
  type: 'input',
  name: 'version',
  message: `version: `,
  default: '0.0.1'
}, {
  type: 'input',
  name: 'description',
  message: `description: `
}, {
  type: 'input',
  name: 'entry',
  message: `entry point: `,
  default: 'index.js'
}, {
  type: 'input',
  name: 'test',
  message: 'test command: '
}, {
  type: 'input',
  name: 'keywords',
  message: 'keywords: '
}, {
  type: 'input',
  name: 'git',
  message: 'git repository: '
}, {
  type: 'input',
  name: 'author',
  message: 'author: '
}, {
  type: 'input',
  name: 'license',
  message: 'license: ',
  default: 'ISC'
}]).then(answers => {
  const {
    type,
    entry,
    test,
    keywords,
    git
  } = answers,
        pkgConifg = _objectWithoutProperties(answers, ["type", "entry", "test", "keywords", "git"]);

  _debug(`init ${type} project`);

  const tplPath = (0, _path.resolve)(tpls, `${type}-project`);
  const pkgPath = (0, _path.resolve)(app, 'package.json');

  let pkg = require((0, _path.resolve)(tplPath, 'package.json'));

  pkg = (0, _lodash.merge)(pkg, _objectSpread({}, pkgConifg, {
    main: entry,
    scripts: {
      test: test ? test : 'echo \"Error: no test specified\" && exit 1'
    },
    keywords: keywords ? keywords : [],
    repository: {
      type: 'git',
      url: git
    }
  }));

  try {
    _logger.default.blue(`begin to initilaize ${type} project`);

    _shelljs.default.cp('-R', `${tplPath}/*`, app);

    (0, _fs.writeFileSync)(pkgPath, format(pkg), {
      encoding: 'utf8'
    });

    _logger.default.blue('loading dependencies');

    _shelljs.default.cd(app);

    _shelljs.default.exec('npm install -q');
  } catch (e) {
    _logger.default.red(e);
  }

  ;
});

function format(pkg) {
  pkg = JSON.stringify(pkg);
  pkg = pkg.slice(1, pkg.length - 1);
  pkg = pkg.replace(/(\"[^\"]+\"):/g, key => `\r\n  ${key} `).replace(/\}/g, str => `\r\n${str}`);
  pkg = pkg.split(/\{|\}/).map((item, idx) => {
    if (idx % 2 !== 0) return `{${item.replace(/(\"[^\"]+\"):/g, key => `  ${key} `)}  }`;
    return item;
  }).join('');
  pkg = `{${pkg}\r\n}`;
  return pkg;
}

;