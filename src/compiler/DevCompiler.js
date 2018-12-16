import webpack from 'webpack';
import { override } from 'core-decorators';
import WebpackDevServer from 'webpack-dev-server';
import clearConsole from 'react-dev-utils/clearConsole';
import openBrowser from 'react-dev-utils/openBrowser';
import { choosePort, createCompiler, prepareProxy, prepareUrls } from 'react-dev-utils/WebpackDevServerUtils';
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware';
import noopServiceWorkerMiddleware from 'react-dev-utils/noopServiceWorkerMiddleware';

import Compiler from './Compiler';
import logger from '../logger';
import applyMockRoutes from '../server/applyMockRoutes';

class DevCompiler extends Compiler {
  @override
  async run(){
    const webpackConfig = await this.generate(false);
    const compiler = webpack(webpackConfig);
    const { context } = this;
    const { devServer } = webpackConfig
    const { https, host = 'localhost', port = 3001 } = devServer || {};
    const protocol = https ? 'https' : 'http';
    const urls = prepareUrls(protocol, host, port);
    const client = new WebpackDevServer(compiler, {
      ...devServer, 
      noInfo: true,
      inline: true,// 处理实时重载的 js 脚本以内联模式插入到页面中
      hot: true,// 模块热替换
      hotOnly: true,// 热替换时，编译失败时是否禁止刷新页面
    });

    // 模拟路由
    applyMockRoutes(client.app, context);
    client.use(errorOverlayMiddleware);

    client.listen(port, host, err => {
      if (err) {
        logger.red("create dev server failed");
        logger.log(err.stack || err.message);
        return;
      };
  
      logger.blue(`create dev server successful: http://${host}:${port}`);
  
      openBrowser(urls.localUrlForBrowser);
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