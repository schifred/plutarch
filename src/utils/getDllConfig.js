'use strict';

import path from 'path';
import webpack from 'webpack';

export default function getDllConfig(cwd,dllOptions){
  const { include } = dllOptions;

  // 第三方公共库以dll方式加载编译，避免重复编译
  const dllConfig = {
    entry: {
      'plutarch': include
    },
    output: {
      path: path.join(cwd, 'dist'),
      filename: '[name].dll.js',
      library: '[name]',// 全局变量名，与DllPlugin中name保持一致
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(cwd, 'dist', '[name]-manifest.json'),// 导出manifest.json
        name: '[name]',
        context: path.resolve(cwd,'./src')// 与DllReferencePlugin中context保持一致
      })
    ]
  };

  return dllConfig;
}