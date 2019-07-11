const { fork } = require('child_process');
const { join, dirname } = require('path');

const DEV_SCRIPT = join(__dirname, '../packages/plutarch/bin/plutarch.js');

function startDevServer(opts = {}) {
  const { port = 3001, cwd } = opts;
  return new Promise(resolve => {
    console.log(`Start dev server for ${cwd}`);
    const child = fork(DEV_SCRIPT, ['build', '-p', '--cwd', cwd], {
      env: {
        ...process.env,
        BROWSER: 'none',
        PROGRESS: 'none'
      },
    });
    child.on('message', args => {
      if (args.type === 'DONE') {
        resolve(child);
      }
    });
  });
}

function start() {
  const devServers = [
    [12341, '../examples/mobx-demo']
  ];

  return Promise.all(
    devServers.map(([port, cwd]) => {
      return startDevServer({ port, cwd: join(__dirname, cwd) });
    }),
  );
}

start();