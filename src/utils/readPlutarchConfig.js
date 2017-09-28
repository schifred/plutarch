'use strict';

const path = require('path');
const fs = require('fs');
const invariant = require('invariant');
const webpack = require('webpack');
const isString = require('lodash/isString');
const isPlainObject = require('lodash/isPlainObject');

// 获取plutarch.config.js配置文件，用于配置webpackConfig、dllConfig
module.exports = function readPlutarchConfig(cwd){
  const plutarchConfigPath = path.resolve(cwd,"./plutarch.config.js");

  if ( !fs.existsSync(plutarchConfigPath) ) return {};

  let plutarchConfig = require(plutarchConfigPath);

  invariant(
    isPlainObject(plutarchConfig),
    "plutarch.config.js should export as a plain object"
  );

  let { entry, output, resolve, extra = {} } = plutarchConfig;

  delete plutarchConfig.extra;

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
    
    if ( output.publicPath ) 
      plutarchConfig.devServer = plutarchConfig.devServer ? 
        Object.assign(plutarchConfig.devServer,{ publicPath: output.publicPath }) : 
        { publicPath: output.publicPath };
  };

  if ( resolve && resolve.alias ){
    let alias = {};

    Object.keys(resolve.alias).map(key=>{
      alias[key] = path.resolve(cwd,alias[key]);
    });
    
    plutarchConfig.resolve.alias = alias;
  };

  return { plutarchConfig, extra };
  
};
