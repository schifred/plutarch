import path from 'path';
import fs from 'fs';
import spawn from 'cross-spawn';
import { getConfig } from './config';
import { name as pluginName, dependencies } from '../../package.json';
import { devDependencies } from '../depend';

/**
 * 获取依赖的版本号
 * @param {string} name 依赖
 * @return {string} 带版本号的依赖名
 */
function getDependencyNameWithVersion(name){
  let version = dependencies[name];
  if ( version ) version = /^\d$/.test(version[0]) ? version : version.slice(1);
  return version ? `${name}@${version}` : name;
};

/**
 * 安装依赖
 * @param {string} name 依赖
 */
export function install(name){
  const npm = getConfig('npm');
  const cwd = getConfig('cwd');
  const modulePath = name && path.resolve(cwd, `./node_modules/${name}`);
  if ( name && fs.existsSync(modulePath) ) return;

  const save = getConfig('save');
  const nameWithVersion = name && getDependencyNameWithVersion(name);
  let args = name ? [npm === 'yarn' ? 'add' : 'install', nameWithVersion] : 
    [npm === 'yarn' ? 'add' : 'install'];
  if ( name && save ) args.push('--save-dev');

  console.info(name ? `Installing ${name} ...` : 'Installing dependencies ...');
  const output = spawn.sync(npm, args, { 
    stdio: ["ignore", "pipe", "inherit"]
  });

  if ( output.error ){
    if ( name ) console.info('npm install webpackrc-cfg is recommended');
    throw output.error;
  };

  console.info('Done');
}

/**
 * 安装依赖
 */
export async function installDependencies(installMode = 'dependencies'){
  // ctrl + c 退出
  process.on('SIGINT', function () {
    console.log('exit!');
    process.exit();
  });

  // await install('@babel/runtime-corejs2');
  if ( !!installMode ) await install();

  if ( installMode === 'devDependencies' ){
    for ( let i = 0; i < devDependencies.length; i++ ){
      const [ moduleName ] = dependencies[devDependencies[i]] ? 
        [devDependencies[i]] : devDependencies[i].split(/\.|\//);
      await install(moduleName);
    };
  } else if ( installMode === 'dependencies' ){
    await install(`${pluginName}`);
  };
};