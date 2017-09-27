'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

function resolveOwn(relativePath){
  return path.resolve(__dirname,relativePath);
};

// 获取项目目录或文件路径
module.exports = function getPaths(cwd){
  const appDirPath = fs.realpathSync(cwd);

  function resolveApp(relativePath) {
    return path.resolve(appDirPath,relativePath);
  }
  
  return {
    appDistPath: resolveApp('dist'),
    appPublicPuth: resolveApp('public'),
    appPackageJsonPath: resolveApp('package.json'),
    appSrcPath: resolveApp('src'),
    appNodeModulesPath: resolveApp('node_modules'),
    dllManifestPath: resolveApp('manifest.json'),
    //appBabelCache: resolveApp('node_modules/.cache/babel-loader'),
    resolveApp,
    appDirPath,
  };
};
