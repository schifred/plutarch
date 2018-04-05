
import { readdirSync, statSync } from 'fs';
import { resolve } from 'path';
import { isRegExp } from 'lodash';

export function extend(def, source){
  let result = { ...def, ...source };

  Object.keys(source).map(key => {
    if ( source[key] === undefined ) result[key] = def[key];
  });

  return result;
};

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
