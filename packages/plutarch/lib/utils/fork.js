"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fork;

var _child_process = _interopRequireDefault(require("child_process"));

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const childs = new Set();
let hasBound = false;

function graceful(proc) {
  childs.add(proc);

  if (!hasBound) {
    hasBound = true;
    let signal;
    ['SIGINT', 'SIGQUIT', 'SIGTERM'].forEach(ev => {
      process.once(ev, () => {
        signal = ev;
        process.exit(0);
      });
    }); // 主进程退出时，杀死子进程

    process.once('exit', () => {
      for (const child of childs) {
        (0, _debug.default)('kill child %s with %s', child.pid, signal);
        child.kill(signal);
      }
    });
  }
}

function fork(modulePath, args = [], options = {}) {
  options.stdio = options.stdio || 'inherit';
  (0, _debug.default)('Run fork `%s %s %s`', process.execPath, modulePath, args.join(' '));

  const proc = _child_process.default.fork(modulePath, args, options);

  graceful(proc);
  return new Promise((resolve, reject) => {
    proc.once('exit', code => {
      childs.delete(proc);

      if (code !== 0) {
        const err = new Error(`${modulePath} ${args} exit with code ${code}`);
        err.code = code;
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = exports.default;