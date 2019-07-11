import expect from 'expect';
import { join, resolve } from 'path';
import { readFileSync, readdirSync } from 'fs';
import glob from 'glob';
import webpack from 'webpack';

/**
 * 比较期望值和实际值
 * @param {string} actualDir 实际目录
 * @param {string} expectDir 期望目录
 */
function assertResult(actualDir, expectDir) {
  const actualFiles = glob.sync('**/*', { cwd: actualDir, nodir: true });

  actualFiles.forEach((file) => {
    const actualFile = readFileSync(join(actualDir, file), 'utf-8');
    const expectFile = readFileSync(join(expectDir, file), 'utf-8');
    expect(actualFile).toEqual(expectFile);
  });
}

/**
 * 使用 webpack 编译，并测试
 * @param {string} cwd cwd
 * @param {function} done 回调
 */
function testBuild(cwd, done) {
  const { getWebpackConfig } = require('../../lib/index');
  const options = require(resolve(cwd, 'config.js'));
  getWebpackConfig({ 
    mode: 'production', 
    ...options
  }, { cwd, npm: 'cnpm' }, false).then(webpackConfig => {
    const compiler = webpack(webpackConfig);
  
    compiler.run((err, stats) => {
      if ( err ){
        console.log('compile failed');
        return;
      };
  
      // try {
      //   assertResult(join(cwd, 'dist'), join(cwd, 'expected'));
      // } catch (e) {
      //   console.log(e);
      // }
      assertResult(join(cwd, 'dist'), join(cwd, 'expected'));
      done();
    });
  });
}

describe('build', () => {
  const buildPath = join(__dirname, '../fixtures/build');
  const dirs = readdirSync(buildPath);

  dirs.filter(dir => dir.charAt(0) !== '.')
    .forEach((dir) => {
      const fn = dir.indexOf('-only') > -1 ? it.only : it;
      fn(dir, (done) => {
        const cwd = join(buildPath, dir);
        process.chdir(cwd);// process.chdir改变工作目录
        testBuild(cwd, done);
      });
    });
});