'use strict';

const path = require('path');
const fs = require('fs');

exports.readdirSync = function(dirPath,cb){
  let dirMap = {};
  let fileMap = {};

  const dirOrFileNames = fs.readdirSync(dirPath);

  dirOrFileNames.map(dirOrFileName=>{
    const dirOrFilePath = path.resolve(dirPath,dirOrFileName);
    const dirOrFileStat = fs.statSync(dirOrFilePath);
    const isDir = dirOrFileStat.isDirectory();
    const isFile = dirOrFileStat.isFile();

    if ( isDir ) dirMap[dirOrFileName] = dirOrFilePath;

    if ( isFile && dirOrFilePath.match(/\.(js|tsx?)$/) ){
      const fileName = dirOrFileName.replace(/\.(js|tsx?)$/, '');
      fileMap[fileName] = dirOrFilePath;
    }
  });

  cb && cb(dirMap,fileMap);

  return {
    dirMap,
    fileMap
  };
};
