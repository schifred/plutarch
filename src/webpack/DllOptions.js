import { resolve } from 'path';
import { override } from 'core-decorators';
import webpack from 'webpack';

import AbstractOptions from './AbstractOptions';

class DllOptions extends AbstractOptions {
  constructor(opts, context){
    super(context);
    this.validateOpts(opts);
    this.init(opts);
  }

  @override
  init(opts){
    const { mode, entry, output, plugins, performance, optimization } = opts || {};
    this.setMode(mode, opts);
    this.setEntry(entry, opts);
    this.setOutput(output, opts);
    this.setPlugins(plugins, opts);
    this.setPerformance(performance, opts);
    this.setOptimization(optimization, opts)
  }

  @override
  setMode(mode, opts){
    const { isBuild } = this;
    this.config.mode = isBuild ? 'production' : 'development';
  }

  @override
  setEntry(entry, opts){
    const { dll } = opts;
    this.config.entry = {
      plutarch: dll
    }
  }

  @override
  setOutput(output, opts){
    const { context, isBuild } = this;
    const { paths: { assets, dist } } = context;
    this.config.output = {
      path: isBuild ? dist : assets,
      filename: '[name].dll.js',
      library: '[name]',// 全局变量名，与 DllPlugin 中 name 保持一致
    }
  }

  @override
  setPlugins(plugins, opts){
    const { paths: { src } } = this.context;
    const manifestPath = this.getManifestPath();
    const { library } = this.config.output;

    this.config.plugins = {
      dllPlugin: {
        Constructor: webpack.DllPlugin,
        args: [{
          path: manifestPath,// 导出 manifest.json
          name: library,
          context: src// 与 DllReferencePlugin 中 context 保持一致
        }]
      }
    };
  }

  @override
  setPerformance(performance, opts){
    const { isBuild } = this;
    this.config.performance = {
      maxAssetSize: 5000000,
      maxEntrypointSize: 5000000,
      hints: isBuild ? 'error' : 'warning'// 资源过大时提示级别
    };
  }

  @override
  setOptimization(optimization, opts){
    const { isBuild } = this;
    this.config.optimization = {
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      minimize: isBuild ? true : false
    };
  }

  // 获取 manifest.json 文件路径
  getManifestPath(){
    const { context, isBuild } = this;
    const { paths: { assets, dist } } = context;
    return resolve(isBuild ? dist : assets, 'plutarch-manifest.json');
  }

  // 将 manifest 注入到实际的工程中
  injectDllReferencePlugin(options){
    const manifestPath = this.getManifestPath();
    console.log(manifestPath)
    let { context, config } = options;
    const { paths: { src } } = context; 

    config.plugins['dllReferencePlugin'] = {
      Constructor: webpack.DllReferencePlugin,
      args: [{
        context: src,
        manifest: manifestPath
      }]
    };
  }
};

export default DllOptions;
