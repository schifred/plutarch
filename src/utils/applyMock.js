'use strict';

import { existsSync, statSync } from 'fs';
import { isFunction, isPlainObject } from 'lodash';
import PlutarchRouter from './PlutarchRouter';
import { traverseDirectory } from './index';

export default function applyMock(options){
  const { plutarchMocksPath, plutarchMockPath } = options;
  
  if ( !existsSync(plutarchMockPath) ) return;

  return function(devServerApp){

    const plutarchRouter = new PlutarchRouter(devServerApp,{
      mockDirPath: plutarchMocksPath
    });
    
    const stat = statSync(plutarchMockPath);
    const isDir = stat.isDirectory();
    const isFile = stat.isFile();

    if ( isFile ){
      applyRoute(plutarchMockPath);
    }else if( isDir ){
      traverse(plutarchMockPath);
    };

    function applyRoute(filePath){
      const appMockRouter = require(filePath);

      if ( isFunction(appMockRouter) ){
        appMockRouter(plutarchRouter);
        return;
      };
    
      if ( isPlainObject(appMockRouter) ){
        Object.keys(appMockRouter).map(key=>{
          let matches = key.split(/\s/);
          let method = matches[0];
          let path = matches[1];
          
          plutarchRouter[method](path,appMockRouter[key]);
        });
      };
      
      throw new Error("mock should export a function or object")
    };
    
    function traverse(path){
      traverseDirectory(path, (fileName,dirOrFilePath,isFile)=>{
        if ( isFile ) applyRoute(dirOrFilePath);
        if ( isDir ) traverse(dirOrFilePath);
      });
    };
    
  };

};
