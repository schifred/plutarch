
import { readdirSync, statSync } from 'fs';
import { resolve } from 'path';

/**
 * 获取文件映射
 * @param {string} path 目录名
 * @param {RegExp} pattern 匹配的正则
 * @return {object} 文件映射
 */
export function getFiles(path, pattern = /\.(js|tsx?)$/){
  let files = {};

  const fsList = readdirSync(path);

  fsList.map(fs => {
    const fsPath = resolve(path, fs);
    const fsStat = statSync(fsPath);

    if ( fsStat.isFile() && fsPath.match(pattern) ){
      const fileName = fs.replace(pattern, '');
      files[fileName] = fsPath;
    };
  });

  return files;
};

/**
 * 获取目录映射
 * @param {string} path 目录名
 * @return {object} 目录映射
 */
export function getDirs(path){
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