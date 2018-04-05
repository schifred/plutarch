import { resolve } from 'path';
import { override } from 'core-decorators';
import { isPlainObject, isFunction, isString, mergeWith } from 'lodash';

import AbstractOptions from './AbstractOptions';
import DefaultOptions from './DefaultOptions';
import { extend } from './helpers/index';

class Options extends AbstractOptions{
  constructor(opts, context){
    super(context);
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

      const { entry, output, module: mod, resolve: resolveConfig, devServer, devtool, 
        target, externals, node } = opts || {};

      this.setEntry(entry, opts);
      this.setOutput(output, opts);
      this.setModule(mod, opts);
      this.setResolve(resolveConfig, opts);
      this.setDevServer(devServer, opts);
      this.setDevtool(devtool, opts);
      this.setTarget(target, opts);
      this.setExternals(externals, opts);
      this.setNode(node, opts);
    } else if ( isFunction(opts) ){
      const defaultOptions = defaultOptions.config;
      const config = opts.call(this, defaultOptions, this.helpers);

      this.config = config ? config : defaultOptions.config;
    };
  }

  @override
  setEntry(entry, opts){
    if ( !entry ) return;

    const { context, isBuild } = this;
    const { paths: { app, devClient } } = context;

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
  setOutput(output, opts){
    if ( !output ) return;

    const { context, isBuild } = this;
    const { paths: { app } } = context;

    const { path, publicPath } = output;

    let { config } = this;

    output = {
      ...output,
      path: resolve(app, path),// 输出目录的绝对路径
      publicPath: isBuild ? './' : publicPath,
    };

    extend(config.output, output);
  }

  @override
  setModule(mod, opts){
    if ( !mod ) return;

    let { config, loaders } = this;

    function getConfig(mainKey, subKey){
      return mod[`${mainKey}${subKey[0].toUpperCase()}${subKey.slice(1)}`] || 
        mod[`${mainKey}.${subKey}`] || (mod[mainKey] && mod[mainKey][subKey]) || null;
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

    config.module.rules = rules;
  }

  @override
  setResolve(resolveConfig, opts){
    if ( !resolveConfig ) return;

    const { context, isBuild } = this;
    const { paths: { app } } = context;
    let { config } = this;
    let { alias } = resolveConfig;

    if ( alias ){
      Object.keys(alias).map(key => {
        alias[key] = resolve(app, alias[key]);
      });

      resolveConfig.alias = alias;
    };

    extend(config.resolve, resolveConfig);
  }

  @override
  setDevServer(devServer, opts){
    let { config, isBuild } = this;
    let { output } = config;

    if ( devServer )
      opts.devServer = {
        ...opts.devServer,
        ...devServer
      };

    if ( isBuild )
      delete config.devServer;
    else
      config.devServer.publicPath = output.publicPath;
  }

  @override
  setDevtool(devtool, opts){
    if ( !devtool ) return;

    let { config } = this;
    config.devtool = devtool;
  }

  @override
  setTarget(target, opts){
    if ( !target ) return;

    let { config } = this;
    config.target = target;
  }

  @override
  setExternals(externals, opts){
    if ( !externals ) return;

    let { config } = this;
    config.externals = externals;
  }

  @override
  setNode(node, opts){
    if ( !node ) return;

    let { config } = this;
    config.node = node;
  }
};

export default Options;
