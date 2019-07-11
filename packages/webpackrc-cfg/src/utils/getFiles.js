import { readdirSync, statSync } from 'fs';
import { resolve } from 'path';

/**
 * 获取文件映射
 * @param {string} path 目录名
 * @param {RegExp} pattern 匹配的正则
 * @return {object} 文件映射
 */
export default function getFiles(path, pattern = /\.(js|tsx?)$/){
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