import fs from 'fs';
import path from 'path';
import spawn from 'cross-spawn';

/**
 * 安装依赖
 * @param {string} name 依赖
 */
export default function install(name, options = { }){
  const cwd = options.cwd || process.cwd();
  const npm = options.npm || 'npm';
  if ( Array.isArray(name) ){
    name = name.filter(realname => {
      const modulePath = path.resolve(cwd, `./node_modules/${realname}`);
      if ( !fs.existsSync(modulePath) ) return true;
    });
    if ( !name.length ) return true;
  } else {
    name = [name];
    return install(name, options);
  };

  let args = [npm === 'yarn' ? 'add' : 'install', ...name];
  if ( name && options.save ) args.push('--save-dev');

  console.info(`Installing ${name ? name : 'dependencies'} ...`);

  const output = spawn.sync(npm, args, { 
    stdio: ["ignore", "pipe", "inherit"]
  });

  if ( output.error ){
    console.info(output.error);
    return false;
  } else {
    console.info('Done');
    return true;
  };
}