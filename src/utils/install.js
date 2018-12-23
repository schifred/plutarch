import fs from 'fs';
import path from 'path';
import spawn from 'cross-spawn';

/**
 * 安装依赖
 * @param {string} name 依赖
 */
export default function install(name, options = { }){
  const { cwd = process.cwd, npm = 'npm', save } = options || cwd;
  const modulePath = name && path.resolve(cwd, `./node_modules/${name}`);

  if ( name && fs.existsSync(modulePath) ) return;

  let args = [npm === 'yarn' ? 'add' : 'install', name];
  if ( save ) args.push('--save-dev');

  console.info(`Installing ${name ? name : 'dependencies'} ...`);

  const output = spawn.sync(npm, args, { 
    stdio: ["ignore", "pipe", "inherit"]
  });
  // spawn.sync(npm, args, { 
  //   stdio: ["ignore", "pipe", "inherit"]
  //   cwd
  // });

  if ( output.error ) console.info(output.error);
  else console.info('Done');
}