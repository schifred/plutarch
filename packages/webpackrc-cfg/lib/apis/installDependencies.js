"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
exports.installDependencies = installDependencies;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _crossSpawn = _interopRequireDefault(require("cross-spawn"));

var _config = require("./config");

var _package = require("../../package.json");

var _depend = require("../depend");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * 获取依赖的版本号
 * @param {string} name 依赖
 * @return {string} 带版本号的依赖名
 */
function getDependencyNameWithVersion(name) {
  let version = _package.dependencies[name];
  if (version) version = /^\d$/.test(version[0]) ? version : version.slice(1);
  return version ? `${name}@${version}` : name;
}

;
/**
 * 安装依赖
 * @param {string} name 依赖
 */

function install(name) {
  const npm = (0, _config.getConfig)('npm');
  const cwd = (0, _config.getConfig)('cwd');

  const modulePath = name && _path.default.resolve(cwd, `./node_modules/${name}`);

  if (name && _fs.default.existsSync(modulePath)) return;
  const save = (0, _config.getConfig)('save');
  const nameWithVersion = name && getDependencyNameWithVersion(name);
  let args = name ? [npm === 'yarn' ? 'add' : 'install', nameWithVersion] : [npm === 'yarn' ? 'add' : 'install'];
  if (name && save) args.push('--save-dev');
  console.info(name ? `Installing ${name} ...` : 'Installing dependencies ...');

  const output = _crossSpawn.default.sync(npm, args, {
    stdio: ["ignore", "pipe", "inherit"]
  });

  if (output.error) {
    if (name) console.info('npm install webpackrc-cfg is recommended');
    throw output.error;
  }

  ;
  console.info('Done');
}
/**
 * 安装依赖
 */


function installDependencies() {
  return _installDependencies.apply(this, arguments);
}

function _installDependencies() {
  _installDependencies = _asyncToGenerator(function* (installMode = 'dependencies') {
    // ctrl + c 退出
    process.on('SIGINT', function () {
      console.log('exit!');
      process.exit();
    }); // await install('@babel/runtime-corejs2');

    if (!!installMode) yield install();

    if (installMode === 'devDependencies') {
      for (let i = 0; i < _depend.devDependencies.length; i++) {
        const [moduleName] = _package.dependencies[_depend.devDependencies[i]] ? [_depend.devDependencies[i]] : _depend.devDependencies[i].split(/\.|\//);
        yield install(moduleName);
      }

      ;
    } else if (installMode === 'dependencies') {
      yield install(`${_package.name}`);
    }

    ;
  });
  return _installDependencies.apply(this, arguments);
}

;