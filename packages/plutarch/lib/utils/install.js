'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

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
      const modulePath = _path2.default.resolve(cwd, `./node_modules/${realname}`);
      if (!_fs2.default.existsSync(modulePath)) return true;
    });
    if (!name.length) return true;
  } else {
    name = [name];
    return install(name, options);
  };

  let args = [npm === 'yarn' ? 'add' : 'install', ...name];
  if (name && options.save) args.push('--save-dev');

  console.info(`Installing ${name ? name : 'dependencies'} ...`);

  const output = _crossSpawn2.default.sync(npm, args, {
    stdio: ["ignore", "pipe", "inherit"]
  });

  if (output.error) {
    console.info(output.error);
    return false;
  } else {
    console.info('Done');
    return true;
  };
}
module.exports = exports.default;