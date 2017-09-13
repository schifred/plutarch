'use strict';

const path = require('path');
const fs = require('fs');

module.exports = function readConfig(cwd){
  const plutarchConfigPath = path.resolve(cwd,"./plutarch.config.js");
  let plutarchConfig = {};

  if ( fs.existsSync(plutarchConfigPath) ){
    plutarchConfig = require(plutarchConfigPath);

    let { entry, output, resolve, externals } = plutarchConfig;
    if ( entry ) plutarchConfig.entry = path.resolve(cwd,entry);
    if ( output ){
      if ( output.path ) plutarchConfig.output.path = path.resolve(cwd,output.path);
      if ( output.publicPath ) plutarchConfig.output.publicPath = path.resolve(cwd,output.publicPath);
    };
  };

  return plutarchConfig;
};