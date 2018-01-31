'use strict';

import debug from "debug";
import invariant from 'invariant';
import { realpathSync, existsSync, readdirSync, statSync } from 'fs';
import { resolve } from 'path';
import { isPlainObject, isFunction, isString, isRegExp, mergeWith, isEqual } from 'lodash';
import webpack,{ validate, WebpackOptionsValidationError } from 'webpack';
import merge from 'webpack-merge';
import yargs from 'yargs';
import logger from './logger';
import * as constants from '../constants';

const _debug = debug('plutarch');

// 获取特定目录或文件路径
export function getPaths(cwd,opts){
  _debug(`get app and pltarch own paths with cwd: ${cwd}`);

  const { config, server, mock, mocks } = opts;
  const appDirPath = realpathSync(cwd);

  function resolveApp(relativePath) {
    return resolve(appDirPath,relativePath);
  };

  function resolveOwn(relativePath){
    return resolve(__dirname, '../../', relativePath);
  };
  
  let paths = {
    appDirPath,
    appDistPath: resolveApp('dist'),
    appPublicPath: resolveApp('public'),
    appPackageJsonPath: resolveApp('package.json'),
    appSrcPath: resolveApp('src'),
    appNodeModulesPath: resolveApp('node_modules'),
    dllManifestPath: resolveApp('manifest.json'),
    plutarchConfigPath: config ? resolveApp(config) : resolveApp(constants.PlutarchConfigPath),
    plutarchServerPath: server ? resolveApp(server) : resolveApp(constants.PlutarchServerPath),
    plutarchMockPath: mock ? resolveApp(mock) : resolveApp(constants.PlutarchMockPath),
    plutarchMocksPath: mocks ? resolveApp(mocks) : resolveApp(constants.PlutarchMocksPath),
    appBabelCachePath: resolveApp('node_modules/.cache/babel-loader'),
    ownNodeModulesPath: resolveOwn('node_modules'),
    resolveApp,
    resolveOwn
  };

  return paths;
};

// 获取plutarch.config.js配置文件，用于配置webpackConfig、dllConfig
export function resolvePlutarchConfig(paths, defaultConfig){
  const { plutarchConfigPath, resolveApp } = paths;

  if ( !existsSync(plutarchConfigPath) ) return {};

  _debug(`resolve plutarch config with config file's path: ${plutarchConfigPath}`);

  let plutarchConfig = require(plutarchConfigPath);

  if ( isFunction(plutarchConfig) ){
    plutarchConfig = plutarchConfig(defaultConfig);
    let { webpackConfig } = plutarchConfig;
    applyYargsArgv(webpackConfig);
    validateWebpackConfig(webpackConfig);
    plutarchConfig.webpackConfig = webpackConfig;
    return transform(plutarchConfig);
  }else if( isPlainObject(plutarchConfig) ){
    plutarchConfig = transform(plutarchConfig);
    let { webpackConfig } = plutarchConfig;
    applyExtraConfig(webpackConfig, plutarchConfig.extra, paths);
    webpackConfig = plutarchMerge(defaultConfig, webpackConfig);
    applyYargsArgv(webpackConfig);
    validateWebpackConfig(webpackConfig);
    plutarchConfig.webpackConfig = webpackConfig;
    return plutarchConfig;
  };

  // 相对路径转换为绝对路径，并提前作校验
  function transform(customConfig){
    let { extra = {}, ...webpackConfig } = customConfig;
    let { entry, output, resolve } = webpackConfig;

    if ( entry ){
      const devClientPath = require.resolve('react-dev-utils/webpackHotDevClient');
      if ( isString(entry) ) {
        webpackConfig.entry = [ resolveApp(entry) ];

        webpackConfig.entry.push(devClientPath);
      } else if ( Array.isArray(entry) ) {
        webpackConfig.entry = entry.map(item=>{
          return resolveApp(item);
        });
        
        webpackConfig.entry.push(devClientPath);
      } else if( isPlainObject(entry) ) {
        webpackConfig.entry = {};
        Object.keys(entry).map(key=>{
          webpackConfig.entry[key] = resolveApp(entry[key]);
        });
        
        webpackConfig.entry.devClient = devClientPath;
      };
    };
  
    if ( output ){
      if ( output.path ) webpackConfig.output.path = resolveApp(output.path);
      
      if ( output.publicPath ) 
        webpackConfig.devServer = webpackConfig.devServer ? 
          { ...webpackConfig.devServer, publicPath: output.publicPath } : 
          { publicPath: output.publicPath };
    };
  
    if ( resolve && resolve.alias ){
      let alias = resolve.alias;
  
      Object.keys(alias).map(key=>{
        alias[key] = resolveApp(alias[key]);
      });
      
      webpackConfig.resolve.alias = alias;
    };
  
    return { webpackConfig, extra };
  };
  
};

// 合并webpack.config默认配置和自定义配置
export function plutarchMerge(defaultConfig,customConfig){

  const webpackConfig = merge({
    customizeObject(a, b, key) {
      if ( ['entry', 'externals'].indexOf(key) !== -1 ) return b || a;

      if ( key === 'resolve' ){
        return {
          ...mergeWith(a,b), 
          extensions: b.extensions ? 
            [ ...b.extensions, ...a.extensions ] : a.extensions
        }
      };

      if (key === 'module') {
        const module = merge.smart(a, b);
        let { rules } = module;
        
        rules = rules.filter((rule,idx)=>{
          let hasSame = rules.slice(idx+1).some(r=>{
            let result = false;

            switch(r.strategy){
              case 'babel':
                result = r.test + '' === rule.test + '';
                break;
            };

            //delete r.strategy;
            return result;
          });

          if ( hasSame ) return false;
          
          return true;
        });

        return {
          ...module,
          rules: rules
        };
      };

      // Fall back to default merging
      return undefined;
    }
  })(defaultConfig,customConfig);

  return webpackConfig;
};

// 校验webpackConfig配置文件
export function validateWebpackConfig(webpackConfig){
  _debug('validate webpack config options');

  const webpackOptionsValidationErrors = validate(webpackConfig);
  
  if ( webpackOptionsValidationErrors.length ){
    logger.red("there is an error in webpack config options: ");
    webpackOptionsValidationErrors.map(err=>{
      logger.red(JSON.stringify({
        dataPath: err.dataPath,
        data: err.data,
      }));
    });

    throw new WebpackOptionsValidationError(webpackOptionsValidationErrors);
  };
};

// 混入yargs执行脚本文件的参数port等
export function applyYargsArgv(webpackConfig){
  const { port } = getYargsArgv();

  _debug(`apply yargs argv as port ${port} to webpack config`);

  if ( port ){
    if ( !webpackConfig.devServer ) webpackConfig.devServer = {};
    if ( webpackConfig.devServer.port !== port ) webpackConfig.devServer.port = port;
  };
};

// 混入特殊的参数如define等
export function applyExtraConfig(webpackConfig, extraConfig, paths){
  const { env } = getYargsArgv();
  const { define, externals, resolveExtensions, babelIncludes, babelPresets, babelPlugins, 
    cssModulesExclude } = extraConfig;
  const { appSrcPath, appNodeModulesPath, resolveApp } = paths;
  const { BabelOptions, eslintLoader } = constants;

  _debug(`apply extra config as define, externals, resolveExtensions, babelIncludes, babelPresets, 
    babelPlugins, cssModulesExclude ... to webpack config`);

  if ( define ){
    invariant(isPlainObject(define), 'extra.define should be an object');
    
    if ( !webpackConfig.plugins ) webpackConfig.plugins = [];
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': env==='prod' ? 'production' : 'development',
        ...define
      })
    )
  };

  if ( externals ){
    webpackConfig.externals = externals;
  };

  if ( resolveExtensions ){
    if ( !webpackConfig.resolve ) webpackConfig.resolve = {};
    webpackConfig.resolve.extensions = resolveExtensions;
  };

  if ( babelIncludes || babelPresets || babelPlugins ){
    if ( !webpackConfig.module ) webpackConfig.module = {};
    if ( !webpackConfig.module.rules ) webpackConfig.module.rules = [];
    webpackConfig.module.rules.push({ 
      strategy: 'babel', 
      test: /\.jsx?$/,
      include: [ 
        appSrcPath, 
        ...( babelIncludes || [] ).map(path => resolveApp(path))
      ],
      exclude: [ appNodeModulesPath ],
      use: [{
        loader: 'babel-loader',
        options: {
          ...BabelOptions,
          presets: [ 
            ...BabelOptions.presets,
            ...babelPresets || []
          ],
          plugins: [ 
            ...BabelOptions.plugins,
            ...babelPlugins || []
          ]
        }
      }, eslintLoader]
    });
  };

  if ( cssModulesExclude ){
    
  };

};

// 获取yargs执行脚本文件的参数
export function getYargsArgv(){
  return yargs.argv;
};

// 获取process携带参数
export function getProcessArgv(){
  const { cwd, platform, env:{ NODE_ENV } } = process;

  return {
    cwd: cwd(),
    NODE_ENV, 
    platform
  };
};

// 遍历获得目录下的文件及目录map
export function traverseDirectory(dirPath, cb, filePattern=/\.(js|tsx?)$/){
  if ( isRegExp(cb) ){
    filePattern = cb;
    cb = null;
  };

  let dirMap = {};
  let fileMap = {};

  const dirOrFileNames = readdirSync(dirPath);

  dirOrFileNames.map(dirOrFileName=>{
    const dirOrFilePath = resolve(dirPath,dirOrFileName);
    const dirOrFileStat = statSync(dirOrFilePath);
    const isDir = dirOrFileStat.isDirectory();
    const isFile = dirOrFileStat.isFile();

    if ( isDir ){
      dirMap[dirOrFileName] = dirOrFilePath;
      cb && cb(dirOrFileName,dirOrFilePath,isFile);
    } else if ( isFile && dirOrFilePath.match(filePattern) ){
      const fileName = dirOrFileName.replace(filePattern, '');
      fileMap[fileName] = dirOrFilePath;
      cb && cb(fileName,dirOrFilePath,isFile);
    };

  });

  return {
    dirMap,
    fileMap
  };
};
