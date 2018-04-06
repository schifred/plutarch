
import { realpathSync, existsSync, readdirSync, statSync } from 'fs';
import { resolve } from 'path';
import yargs from 'yargs';

class Context {
  constructor(){
    this.getProcessArgv();
    this.getCommandArgv();
    this.getPaths();
  }

  getProcessArgv(){
    const { cwd, platform, env:{ NODE_ENV } } = process;

    this.env = {
      cwd: cwd(),
      platform,
      NODE_ENV
    };

    this.isBuild = NODE_ENV === 'production';
  }

  getCommandArgv(){
    const { argv }  = yargs;

    this.argv = argv || {};
  }

  getPaths(){
    const { env, argv } = this;
    const { cwd } = env;
    const { src = 'src', dist = 'dist', assets = 'assets', 
      config = 'plutarch.config.js', server = 'plutarch.server.js', 
      mock = 'plutarch.mock.js', mocks = 'mocks' } = argv;

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
