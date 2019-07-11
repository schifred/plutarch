'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCtx;

var _fs = require('fs');

var _path = require('path');

var _config = require('../apis/config');

/**
 * 获取上下文
 * @param {object} paths 相对路径
 * @param {string} cwd cwd
 * @return {object} 包含路径的上下文
 */
function createCtx(paths = {}, cwd) {
  const { src = 'src', dist = 'dist', assets = 'assets', nodeModules = 'node_modules' } = paths;
  const app = (0, _fs.realpathSync)(cwd || (0, _config.getConfig)('cwd'));

  return {
    cwd,
    paths: {
      src,
      dist,
      assets,
      nodeModules
    },
    realPaths: {
      app,
      src: (0, _path.resolve)(app, src),
      dist: (0, _path.resolve)(app, dist),
      assets: (0, _path.resolve)(app, assets),
      nodeModules: (0, _path.resolve)(app, nodeModules)
    }
  };
}
module.exports = exports.default;