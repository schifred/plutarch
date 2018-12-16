import { realpathSync } from 'fs';
import { resolve } from 'path';
import yargs from 'yargs';
import { ConfigPath, ServerPath, MockPath, MocksPath } from './constants';

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
    const { cwd, platform, env:{ NODE_ENV } } = process;

    this.env = {
      cwd: cwd(),
      platform,
      NODE_ENV
    };

    this.isBuild = NODE_ENV === 'production';
  }

  /**
   * 参数相关
   */
  getCommandArgv(){
    const { argv = {} }  = yargs;
    const { src = 'src', dist = 'dist', assets = 'assets', config = ConfigPath, 
      server = ServerPath, mock = MockPath, mocks = MocksPath } = argv;

    this.argv = {
      src,
      dist,
      assets,
      config,
      server,
      mock,
      mocks,
      ...argv
    };
  }

  /**
   * 路径相关
   */
  getPaths(){
    const { env, argv } = this;
    const { cwd } = env;
    const { src, dist, assets, config, server, mock, mocks } = argv;

    const app = realpathSync(cwd);
    
    this.paths = {
      app,
      src: resolve(app, src),
      dist: resolve(app, dist),
      assets: resolve(app, assets),
      pkg: resolve(app, 'package.json'),
      nodeModules: resolve(app, 'node_modules'),
      plrc: resolve(app, config),
      plsv: resolve(app, server),
      plmc: resolve(app, mock),
      plmcs: resolve(app, mocks),
      cache: resolve(app, 'node_modules/.cache/babel-loader'),
      devClient: resolve(__dirname, '../node_modules/react-dev-utils/webpackHotDevClient'),
      buildinNodeModules: resolve(__dirname, '../node_modules'),
      tpls: resolve(__dirname, '../templates')
    };
  };
};

export default Context;
