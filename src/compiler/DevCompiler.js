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
  run(){
    const { context, options, compiler } = this;
    const { devServer } = options.getWebpackConfig();
    const { https, host, port } = devServer;
    const protocol = https ? 'https' : 'http';
    const urls = prepareUrls(protocol, host, port);
    const client = new WebpackDevServer(compiler, devServer);

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