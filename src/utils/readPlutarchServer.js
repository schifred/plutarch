'use strict';

const path = require('path');
const fs = require('fs');
const isFunction = require('lodash/isFunction');
const logger = require('./logger');

module.exports = function readConfig(cwd){
  const plutarchServerPath = path.resolve(cwd,"./plutarch.server.js");
  let serverConfig;

  if ( fs.existsSync(plutarchServerPath) ){
    serverConfig = require(plutarchServerPath);
    if ( isFunction(serverConfig) ){
      return serverConfig;
    };
  };

};
