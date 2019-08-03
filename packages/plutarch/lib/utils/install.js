"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _crossSpawn = _interopRequireDefault(require("cross-spawn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 安装依赖
 * @param {string} name 依赖
 */
function install(name, options = {}) {
  const cwd = options.cwd || process.cwd();
  const npm = options.npm || 'npm';

  if (Array.isArray(name)) {
    name = name.filter(realname => {
      const modulePath = _path.default.resolve(cwd, `./node_modules/${realname}`);

      if (!_fs.default.existsSync(modulePath)) return true;
    });
    if (!name.length) return true;
  } else {
    name = [name];
    return install(name, options);
  }

  ;
  let args = [npm === 'yarn' ? 'add' : 'install', ...name];
  let saveArg = '';
  if (name && options.save) saveArg = '--save';
  if (name && options.dev) saveArg = '--save-dev';
  args.push(saveArg);
  console.info(`Installing ${name ? name : 'dependencies ...'}${saveArg ? ' ' + saveArg : ''}`);

  const output = _crossSpawn.default.sync(npm, args, {
    stdio: ["ignore", "pipe", "inherit"]
  });

  if (output.error) {
    console.info(output.error);
    return false;
  } else {
    console.info('Done');
    return true;
  }

  ;
}

module.exports = exports.default;