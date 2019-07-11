'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = config;
exports.getConfig = getConfig;
let cfg = {
  npm: 'npm',
  save: false,
  cwd: process.cwd()
};

/**
 * 全局配置相关
 * @param {object} opts 全局配置 
 */
function config(opts = {}) {
  if (opts.npm !== undefined) cfg.npm = opts.npm;
  if (opts.save !== undefined) cfg.save = opts.save;
  if (opts.cwd !== undefined) cfg.cwd = opts.cwd;
};

/**
 * 获取全局配置
 * @param {string} key 属性名
 * @return {any} 全局配置 
 */
function getConfig(key) {
  return key ? cfg[key] : cfg;
}