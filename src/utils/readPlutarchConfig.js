'use strict';

const path = require('path');
const fs = require('fs');
const isString = require('lodash/isString');
const isPlainObject = require('lodash/isPlainObject');

module.exports = function readConfig(cwd){
  const plutarchConfigPath = path.resolve(cwd,"./plutarch.config.js");
  let plutarchConfig = {};

  if ( fs.existsSync(plutarchConfigPath) ){
    plutarchConfig = require(plutarchConfigPath);

    let { entry, output, resolve, externals } = plutarchConfig;
    if ( entry ){
      if ( isString(entry) ) {
        plutarchConfig.entry = path.resolve(cwd,entry);
      } else if ( Array.isArray(entry) ) {
        plutarchConfig.entry = entry.map(item=>{
          return path.resolve(cwd,item);
        });
      } else if( isPlainObject(entry) ) {
        plutarchConfig.entry = {};
        Object.keys(entry).map(key=>{
          plutarchConfig.entry[key] = path.resolve(cwd,entry[key]);
        });
      };
    };

    if ( output ){
      if ( output.path ) plutarchConfig.output.path = path.resolve(cwd,output.path);
    };

    if ( resolve && resolve.alias ){
      let alias = {};

      Object.keys(resolve.alias).map(key=>{
        alias[key] = path.resolve(cwd,alias[key]);
      });
      
      resolve.alias = alias;
    };
  };

  return plutarchConfig;
};
