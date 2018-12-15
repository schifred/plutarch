
import { readdirSync, statSync } from 'fs';
import { resolve } from 'path';

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