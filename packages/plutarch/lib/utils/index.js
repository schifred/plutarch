"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _install = _interopRequireDefault(require("./install"));

var _fs = require("fs");

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    }

    ;
  });
  return files;
}

;
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
    }

    ;
  });
  return dirs;
}

var _default = {
  install: _install.default,
  getFiles,
  getDirs
};
exports.default = _default;
module.exports = exports.default;