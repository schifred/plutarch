import fs from 'fs';
import path from 'path';
import spawn from 'cross-spawn';

/**
 * 安装依赖
 * @param {string} name 依赖
 */
export default function install(name, options = { }){
  if ( Array.isArray(name) ){
    name.map(realname => install(realname, options));
    return;
  };
  
  const cwd = options.cwd || process.cwd();
  const npm = options.npm || 'npm';
  const modulePath = name && path.resolve(cwd, `./node_modules/${name}`);

  if ( name && fs.existsSync(modulePath) ) return;

  let args = [npm === 'yarn' ? 'add' : 'install', name];
  if ( name && options.save ) args.push('--save-dev');

  console.info(`Installing ${name ? name : 'dependencies'} ...`);

  const output = spawn.sync(npm, args, { 
    stdio: ["ignore", "pipe", "inherit"]
  });

  if ( output.error ) console.info(output.error);
  else console.info('Done');
}