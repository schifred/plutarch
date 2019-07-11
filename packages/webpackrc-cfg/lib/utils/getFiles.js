'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFiles;

var _fs = require('fs');

var _path = require('path');

/**
 * 获取文件映射
 * @param {string} path 目录名
 * @param {RegExp} pattern 匹配的正则
 * @return {object} 文件映射
 */
function getFiles(path, pattern = /\.(js|tsx?)$/) {
  let files = {};

  const fsList = (0, _fs.readdirSync)(path);

  fsList.map(fs => {
    const fsPath = (0, _path.resolve)(path, fs);
    const fsStat = (0, _fs.statSync)(fsPath);

    if (fsStat.isFile() && fsPath.match(pattern)) {
      const fileName = fs.replace(pattern, '');
      files[fileName] = fsPath;
    };
  });

  return files;
};
module.exports = exports.default;