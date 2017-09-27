'use strict';

const yargs = require("yargs");
const merge = require('webpack-merge');

// 整合命令参数
function applyCommandArgvs(currentConfig){
  const { port } = yargs.argv;

  if ( port && currentConfig.devServer.port != port ) 
    currentConfig.devServer.port = port;

  return currentConfig;
};

// 合并plutarch.config.js和defaultConfig
module.exports = function plutarchMerge(defaultConfig,plutarchConfig){
  let currentConfig = merge({
    customizeObject(a, b, key) {
      if (key === 'module') {
        return {
          rules: merge.smart([a.module.rules, b.module.rules])
        };
      };

      // Fall back to default merging
      return undefined;
    }
  })(defaultConfig,plutarchConfig);

  return applyCommandArgvs(currentConfig);
};
