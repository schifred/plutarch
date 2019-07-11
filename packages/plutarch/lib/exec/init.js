'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _path = require('path');

var _fs = require('fs');

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _lodash = require('lodash');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const _debug = (0, _debug3.default)('plutarch');

const context = new _Context2.default();
const { paths: { app, tpls } } = context;

_inquirer2.default.prompt([{
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
  const { type, entry, test, keywords, git } = answers,
        pkgConifg = _objectWithoutProperties(answers, ['type', 'entry', 'test', 'keywords', 'git']);

  _debug(`init ${type} project`);

  const tplPath = (0, _path.resolve)(tpls, `${type}-project`);
  const pkgPath = (0, _path.resolve)(app, 'package.json');
  let pkg = require((0, _path.resolve)(tplPath, 'package.json'));
  pkg = (0, _lodash.merge)(pkg, _extends({}, pkgConifg, {
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
    _logger2.default.blue(`begin to initilaize ${type} project`);

    _shelljs2.default.cp('-R', `${tplPath}/*`, app);

    (0, _fs.writeFileSync)(pkgPath, format(pkg), { encoding: 'utf8' });

    _logger2.default.blue('loading dependencies');

    _shelljs2.default.cd(app);
    _shelljs2.default.exec('npm install -q');
  } catch (e) {
    _logger2.default.red(e);
  };
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
};