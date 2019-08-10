import { realpathSync, existsSync } from 'fs';
import { resolve } from 'path';
import yargs from 'yargs';
import { ServerPath, MockPath, MocksPath, ConfigsPath } from './constants';

/**
 * 上下文相关
 */
class Context {
  constructor(){
    this.getProcessArgv();
    this.getCommandArgv();
    this.getPaths();
  }

  /**
   * 参数相关
   */
  getProcessArgv(){
    const { cwd, platform, env:{ NODE_ENV, environment } } = process;

    this.env = {
      cwd: cwd(),
      platform,
      NODE_ENV, 
      environment
    };

    this.isBuild = NODE_ENV === 'production';
  }

  /**
   * 参数相关
   */
  getCommandArgv(){
    const { argv = {} }  = yargs;
    const { src = 'src', dist = 'dist', assets = 'assets', 
      server = ServerPath, mock = MockPath, mocks = MocksPath, configs = ConfigsPath } = argv;

    this.argv = {
      src,
      dist,
      assets,
      server,
      mock,
      mocks,
      configs, 
      ...argv
    };
  }

  /**
   * 路径相关
   */
  getPaths(){
    const { env, argv } = this;
    const { cwd, environment } = env;
    const { src, dist, assets, config, server, mock, mocks, configs } = argv;

    const app = realpathSync(cwd);

    let plurcPath = resolve(app, `.plutarch/${environment}.config.js`);
    if (!existsSync(plurcPath)){
      plurcPath = resolve(app, 'plutarch.config.js');
    }
    
    this.paths = {
      app,
      src: resolve(app, src),
      dist: resolve(app, dist),
      assets: resolve(app, assets),
      pkg: resolve(app, 'package.json'),
      tmpdir: resolve(app, '.tmpdir'),
      localConfig: resolve(app, `${configs}/local.yaml`),
      envConfig: resolve(app, `${configs}/${environment}.yaml`),
      nodeModules: resolve(app, 'node_modules'),
      plrc: plurcPath,
      webpackrc: resolve(app, `.plutarch/webpack.config.js`),
      plsv: resolve(app, server),
      plmc: resolve(app, mock),
      plmcs: resolve(app, mocks),
      cache: resolve(app, 'node_modules/.cache/babel-loader'),
      devClient: resolve(__dirname, '../node_modules/react-dev-utils/webpackHotDevClient'),
      buildinNodeModules: resolve(__dirname, '../node_modules'),
      tpls: resolve(__dirname, '../tpls')
    };
  };
};

export default Context;
