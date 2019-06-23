import { webpack } from 'webpackrc-cfg';
import { override } from 'core-decorators';
import WebpackDevServer from 'webpack-dev-server';
import openBrowser from 'react-dev-utils/openBrowser';
import { choosePort, prepareUrls } from 'react-dev-utils/WebpackDevServerUtils';
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware';
import { watch } from '../utils/watch';

import BaseCompiler from './BaseCompiler';
import logger from '../logger';
import applyMockRoutes from '../server/applyMockRoutes';

const defaultHost = '0.0.0.0';

class DevCompiler extends BaseCompiler {
  constructor(options, context){
    super(options, context);
    const { plrc, plsv, plmc, plmcs } = this.context.paths;

    // 监听文件变更
    watch('plutarch dev', [plrc, plsv, plmc, plmcs]).on('all', () => {
      this.refreshBrowser();
      this.server.close();
      this.run();
    });
  }

  refreshBrowser(){
    if ( this.server ){
      this.server.sockWrite(this.server.sockets, 'content-changed');
    };
  }

  @override
  async run(){
    const webpackConfig = await this.generate('development');
    const compiler = webpack(webpackConfig);
    const { context } = this;
    const { devServer } = this.options || {};
    const { https, host = defaultHost, port = 3001 } = devServer || {};
    const protocol = https ? 'https' : 'http';
    const urls = prepareUrls(protocol, host, port);
    this.server = new WebpackDevServer(compiler, {
      noInfo: true,
      inline: true,// 处理实时重载的 js 脚本以内联模式插入到页面中
      hot: true,// 模块热替换
      hotOnly: true,// 热替换时，编译失败时是否禁止刷新页面
      quiet: true,
      headers: {
        'access-control-allow-origin': '*',
      },
      ...devServer,
    });
    
    let isFirstCompile = true;

    // 模拟路由
    applyMockRoutes(this.server.app, context);
    this.server.use(errorOverlayMiddleware);

    choosePort(host, port).then(realPort => {
      compiler.hooks.done.tap('plutarch dev', stats => {
        if (stats.hasErrors()) {
          // make sound
          // ref: https://github.com/JannesMeyer/system-bell-webpack-plugin/blob/bb35caf/SystemBellPlugin.js#L14
          if (process.env.SYSTEM_BELL !== 'none') {
            process.stdout.write('\x07');
          }
          return;
        };

        this.refreshBrowser();
    
        if ( isFirstCompile ){
          let copied;
          try {
            require('clipboardy').writeSync(urls.localUrlForBrowser);
            copied = logger.dim('(copied to clipboard)', true);
          } catch (e) {
            copied = logger.red(`(copy to clipboard failed)`, true);
          };

          logger.log([
            `  App running at:`,
            `  - Local:   ${logger.blue(`${urls.localUrlForTerminal} ${copied}`, true)}`,
            `  - Network: ${logger.blue(urls.lanUrlForTerminal, true)}`,
          ].join('\n'));


          if ( openBrowser(urls.localUrlForBrowser) ){
            logger.log('The browser tab has been opened!');
          };

          isFirstCompile = false;
        };
      });

      this.server.listen(realPort, host, err => {
        if (err) {
          logger.log(err.stack || err.message);
          return;
        };
      });
    }).catch(err => {
      logger.log(err);
    });
    
    ['SIGINT', 'SIGTERM'].forEach(sig => {
      process.on(sig, () => {
        this.server.close(() => {
          process.exit(0);
        });
      });
    });
  }
};

export default DevCompiler;