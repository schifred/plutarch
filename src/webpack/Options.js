import { resolve } from 'path';
import { override } from 'core-decorators';
import { isPlainObject, isFunction, isString, mergeWith } from 'lodash';

import AbstractOptions from './AbstractOptions';
import DefaultOptions from './DefaultOptions';
import { extend } from './helpers/index';

class Options extends AbstractOptions{
  constructor(opts, context, isBuild){
    super(context, isBuild);
    this.validateOpts(opts);
    this.init(opts);
  }

  @override
  validateOpts(opts){
    if ( !isPlainObject(opts) && !isFunction(opts) )
      throw new Error('opts should be an object or a function');
  }

  @override
  init(opts){
    const { context, isBuild } = this;
    const defaultOptions = new DefaultOptions(context, isBuild);

    if ( isPlainObject(opts) ){
      this.config = defaultOptions.config;

      this.setEntry(opts);// 设置入口文件
      this.setOutput(opts);// 设置输出
      this.setModule(opts);
      this.setResolve(opts);// 设置解析
      this.setDevServer(opts);
      this.setDevtool(opts);
      this.setTarget(opts);
      this.setExternals(opts);
      this.setNode(opts);
    } else if ( isFunction(opts) ){
      const defaultOptions = defaultOptions.config;
      const config = opts.call(this, defaultOptions, this.helpers);

      this.config = config ? config : defaultOptions.config;
    };
  }

  @override
  setEntry(opts){
    const { context, isBuild } = this;
    const { paths: { app, devClient } } = context;
    const { entry } = opts;

    if ( !entry ) return;

    let { config } = this;

    if ( isPlainObject(entry) ){
      config.entry = {};

      Object.keys(entry).map(key=>{
        this.config.entry[key] = resolve(app, entry[key]);
      });

      if ( !isBuild ) config.entry.devClient = devClient;
    } else {
      if ( isString(entry) )
        config.entry = [ resolve(app, entry) ];
      else if ( Array.isArray(entry) )
        config.entry = entry.map(item => {
          return resolve(app, item);
        });
      
      if ( !isBuild ) config.entry.push(devClient);
    };
  }

  @override
  setOutput(opts){
    const { context, isBuild } = this;
    const { paths: { app } } = context;
    const { output } = opts;

    if ( !output ) return;

    const { path, publicPath } = output;

    let { config } = this;

    this.config.output = {
      ...output,
      path: resolve(app, path),// 输出目录的绝对路径
      publicPath: isBuild ? './' : publicPath,
    };

    extend(config.output, output);
  }

  @override
  setModule(opts){
    let { config, loaders } = this;
    let { module } = this.config;

    function getConfig(mainKey, subKey){
      return opts[`${mainKey}${subKey[0].toUpperCase()}${subKey.slice(1)}`] || 
        opts[`${mainKey}.${subKey}`] || (opts[mainKey] && opts[mainKey][subKey]) || null;
    };

    Object.keys(loaders).map(key => {
      let { loader } = loaders[key];
      const { options: defaultOptions = {} } = loader;
      let options = getConfig(key, 'options');

      if ( !options ) return;

      options = mergeWith(loader.options, options, (obj, src) => {
        if ( Array.isArray(obj) )
          return [ ...obj, ...src ];
        if ( isPlainObject(obj) )
          return { ...obj, ...src };

        return src;
      });

      loader = {
        ...loader,
        options
      };
    });

    let rules = this.convertLoadersToRules();

    Object.keys(rules).map(key => {
      let rule = rules[key];
      const test = getConfig(key, 'test');
      const include = getConfig(key, 'include');
      const exclude = getConfig(key, 'exclude');

      if ( test ) rule.test = test;
      if ( include ) rule.include = include;
      if ( exclude ) rule.exclude = exclude;
    });

    module.rules = rules;
  }

  @override
  setResolve(opts){
    const { context, isBuild } = this;
    const { paths: { app } } = context;

    let { config } = this;
    let { resolve: resolveConfig } = opts;

    if ( !resolveConfig ) return;

    let { alias } = resolveConfig;

    Object.keys(alias).map(key => {
      alias[key] = resolve(app, alias[key]);
    });

    resolveConfig = {
      ...resolveConfig,
      alias
    };

    extend(config.resolve, resolveConfig);
  }

  @override
  setDevServer(opts){
    let { config, isBuild } = this;
    let { output, devServer } = config;
    
    if ( isBuild )
      delete config.devServer;
    else
      devServer.publicPath = output.publicPath;
  }

  @override
  setDevtool(opts){
    let { config } = this;
    let { devtool } = opts;

    if ( !devtool ) return;

    config.devtool = devtool;
  }

  @override
  setTarget(opts){
    let { config } = this;
    let { target } = opts;

    if ( !target ) return;

    config.target = target;
  }

  @override
  setExternals(opts){
    let { config } = this;
    let { externals } = opts;

    if ( !externals ) return;

    config.externals = externals;
  }

  @override
  setNode(opts){
    let { config } = this;
    let { node } = opts;

    if ( !node ) return;

    config.node = node;
  }
};

export default Options;
