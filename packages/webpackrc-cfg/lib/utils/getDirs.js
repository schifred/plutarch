'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDirs;

var _fs = require('fs');

var _path = require('path');

/**
 * 获取目录映射
 * @param {string} path 目录名
 * @return {object} 目录映射
 */
function getDirs(path) {
  let dirs = {};

  const dirsList = (0, _fs.readdirSync)(path);

  dirsList.map(dirName => {
    const dirPath = (0, _path.resolve)(path, dirName);
    const dirStat = (0, _fs.statSync)(dirPath);

    if (dirStat.isDirectory()) {
      dirs[dirName] = dirPath;
    };
  });

  return dirs;
}
module.exports = exports.default;