'use strict';

import path from 'path';
import fs from 'fs';
import invariant from 'invariant';
import isFunction from 'lodash/isFunction';

// 获取plutarch.server.js配置文件，用于对devServerApp进行扩展
export default function readConfig(cwd){
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
