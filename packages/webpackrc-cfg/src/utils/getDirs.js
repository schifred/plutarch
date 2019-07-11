import { readdirSync, statSync } from 'fs';
import { resolve } from 'path';

/**
 * 获取目录映射
 * @param {string} path 目录名
 * @return {object} 目录映射
 */
export default function getDirs(path){
  let dirs = {};

  const dirsList = readdirSync(path);

  dirsList.map(dirName => {
    const dirPath = resolve(path, dirName);
    const dirStat = statSync(dirPath);

    if ( dirStat.isDirectory() ){
      dirs[dirName] = dirPath;
    };
  });

  return dirs;
}