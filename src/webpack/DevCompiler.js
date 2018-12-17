import webpack from 'webpack';
import { override } from 'core-decorators';
import WebpackDevServer from 'webpack-dev-server';
import openBrowser from 'react-dev-utils/openBrowser';
import { choosePort, prepareUrls } from 'react-dev-utils/WebpackDevServerUtils';
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware';

import BaseCompiler from './BaseCompiler';
import logger from '../logger';
import applyMockRoutes from '../server/applyMockRoutes';

class DevCompiler extends BaseCompiler {
  @override
  async run(){
    const webpackConfig = await this.generate('development');
    const compiler = webpack(webpackConfig);
    const { context } = this;
    const { devServer, open } = this.options || {};
    const { https, host = 'localhost', port = 3001 } = devServer || {};
    const protocol = https ? 'https' : 'http';
    const urls = prepareUrls(protocol, host, port);
    const client = new WebpackDevServer(compiler, {
      noInfo: true,
      inline: true,// 处理实时重载的 js 脚本以内联模式插入到页面中
      hot: true,// 模块热替换
      hotOnly: true,// 热替换时，编译失败时是否禁止刷新页面
      ...devServer,
      quiet: true
    });

    // 模拟路由
    applyMockRoutes(client.app, context);
    client.use(errorOverlayMiddleware);

    choosePort(host, port).then(realPort => {
      client.listen(realPort, host, err => {
        if (err) {
          logger.red("create dev server failed");
          logger.log(err.stack || err.message);
          return;
        };
    
        logger.blue(`create dev server successful: http://${host}:${realPort}`);
    
        if ( open && openBrowser(urls.localUrlForBrowser) ){
          logger.log('The browser tab has been opened!');
        };
      });
    });
    
    ['SIGINT', 'SIGTERM'].forEach(sig => {
      process.on(sig, () => {
        client.close();
        process.exit();
      });
    });
  }
};

export default DevCompiler;