'use strict';

import debug from 'debug';
import webpack from 'webpack';
import { existsSync } from 'fs';
import merge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
// npm install类库时重构项目
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';

import { traverseDirectory, getPlutarchConfig } from '../utils';
import getCommonConfig from './webpack.common';

const _debug = debug('plutarch');

function getServerConfig(paths, processArgv, yargsArgv){
  _debug(`get server config`)

  const { platform } = processArgv;
  const { appSrcPath, appDistPath, plutarchConfigPath, resolveApp  } = paths;
  const { fileMap: htmlPathsMap } = traverseDirectory('src',/\.html$|\.ejs$/);

  const serverConfig = {
    entry: {
      devClient: require.resolve('react-dev-utils/webpackHotDevClient'),// 报错页面
    },
    devtool: "inline-source-map",
    plugins: [
      // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      // new InterpolateHtmlPlugin({
      //   PUBLIC_URL: "/"
      //   // You can pass any key-value pairs, this was just an example.
      //   // WHATEVER: 42 will replace %WHATEVER% with 42 in index.html.
      // }),
      
      ...Object.keys(htmlPathsMap).map(fileName=>{
        return new HtmlWebpackPlugin({
          title: fileName,
          showErrors: true,
          template: htmlPathsMap[fileName]
        })
      }),
      new webpack.HotModuleReplacementPlugin(),
      platform !== 'Windows_NT' ? new CaseSensitivePathsPlugin() : null,// 解决不同操作系统文件路径问题
      new WatchMissingNodeModulesPlugin(),
    ].filter(plugin=>!!plugin),
    devServer: {
      disableHostCheck: true,
      compress: true,
      hot: true,
      contentBase: appDistPath,// 额外的静态资源所在目录
      publicPath: '/',// 内存中编译文件由服务器加载时的文件位
      quiet: false,// 是否关闭控制台日志打印
      clientLogLevel: 'warning',// 控制台打印日志级别
      stats: {
        colors: true
      },//终端中输出结果为彩色
      watchOptions: {
        //ignored: /node_modules/,
      },
      historyApiFallback: true,//不跳转
      host: '127.0.0.1',
      port: 3001,
    }
  };

  const commonConfig = getCommonConfig(paths, processArgv, yargsArgv);

  _debug('merge common config into server config');

  const webpackConfig = merge(commonConfig,serverConfig);

  return webpackConfig;
};

export default getServerConfig;
