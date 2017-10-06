import expect from 'expect';
import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import glob from 'glob';
import { fork } from 'child_process';

function assertResult(actualDir, expectDir) {
  const actualFiles = glob.sync('**/*', { cwd: actualDir, nodir: true });

  actualFiles.forEach((file) => {
    const actualFile = readFileSync(join(actualDir, file), 'utf-8');
    const expectFile = readFileSync(join(expectDir, file), 'utf-8');
    expect(actualFile).toEqual(expectFile);
  });
}

function testBuild(cwd, done) {
  const buildPath = require.resolve('../../lib/exec/runBuild');
  const subProcess = fork(buildPath, {
    cwd,
  });
  subProcess.on('close', (err) => {
    console.log(err);
    try {
      assertResult(join(cwd, 'dist'), join(cwd, 'expected'));
    } catch (e) {
      console.log(e);
    }
    done();
  });
}

describe('build', () => {
  const buildPath = join(__dirname, '../fixtures/build');
  const dirs = readdirSync(buildPath);

  dirs
    .filter(dir => dir.charAt(0) !== '.')
    .forEach((dir) => {
      const fn = dir.indexOf('-only') > -1 ? it.only : it;
      fn(dir, (done) => {
        const cwd = join(buildPath, dir);
        console.log(cwd)
        process.chdir(cwd);// process.chdir改变工作目录
        testBuild(cwd, done);
      });
    });
});