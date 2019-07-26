import cp from 'child_process';
import debug from 'debug';

const childs = new Set();
let hasBound = false;

function graceful(proc){
  childs.add(proc);

  if (!hasBound){
    hasBound = true;
    let signal;
    
    ['SIGINT', 'SIGQUIT', 'SIGTERM'].forEach(ev => {
      process.once(ev, () => {
        signal = ev;
        process.exit(0);
      });
    });

    // 主进程退出时，杀死子进程
    process.once('exit', () => {
      for (const child of childs) {
        debug('kill child %s with %s', child.pid, signal);
        child.kill(signal);
      }
    });
  }
}

export default function fork(modulePath, args = [], options = { }){
  options.stdio = options.stdio || 'inherit';
  debug('Run fork `%s %s %s`', process.execPath, modulePath, args.join(' '));
  const proc = cp.fork(modulePath, args, options);
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
    })
  })
}