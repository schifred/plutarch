'use strict';

import debug from 'debug';
import webpack from 'webpack';

const _debug = debug('plutarch');

function getDllConfig(paths, options){
  _debug(`get dll config`)

  const { include } = options;
  const { appSrcPath, appDistPath, resolveApp } = paths;

  // 第三方公共库以dll方式加载编译，避免重复编译
  const dllConfig = {
    entry: {
      'plutarch': include
    },
    output: {
      path: appDistPath,
      filename: '[name].dll.js',
      library: '[name]',// 全局变量名，与DllPlugin中name保持一致
    },
    plugins: [
      new webpack.DllPlugin({
        path: resolveApp('dist/[name]-manifest.json'),// 导出manifest.json
        name: '[name]',
        context: appSrcPath// 与DllReferencePlugin中context保持一致
      })
    ]
  };

  return dllConfig;
};

export default getDllConfig;
