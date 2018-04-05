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
    const { entry, output, plugins } = opts || {};
    this.setEntry(entry, opts);
    this.setOutput(output, opts);
    this.setPlugins(plugins, opts);
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
    const { paths: { src } } = this.context;
    this.config.output = {
      path: src,
      filename: '[name].dll.js',
      library: '[name]',// 全局变量名，与 DllPlugin 中 name 保持一致
    }
  }

  @override
  setPlugins(plugins, opts){
    const { paths: { src } } = this.context;
    const manifestPath = this.getManifestPath();
    const { library } = this.config.output;

    this.config.pluigns = {
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

  // 获取 manifest.json 文件路径
  getManifestPath(){
    const { paths: { dist } } = this.context;
    return resolve(dist, 'plutarch-manifest.json');
  }
};

export default DllOptions;
