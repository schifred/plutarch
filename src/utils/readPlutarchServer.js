'use strict';

const path = require('path');
const fs = require('fs');
const invariant = require('invariant');
const isFunction = require('lodash/isFunction');

// 获取plutarch.server.js配置文件，用于对devServerApp进行扩展
module.exports = function readConfig(cwd){
  const plutarchServerPath = path.resolve(cwd,"./plutarch.server.js");
  let serverConfig;

  if ( fs.existsSync(plutarchServerPath) ){
    serverConfig = require(plutarchServerPath);

    invariant(
      isFunction(serverConfig),
      "plutarch.server should export as a function"
    );
  };
  
  return serverConfig;
};
