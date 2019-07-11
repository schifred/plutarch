import { realpathSync } from 'fs';
import { resolve } from 'path';
import { getConfig } from '../apis/config';

/**
 * 获取上下文
 * @param {object} paths 相对路径
 * @param {string} cwd cwd
 * @return {object} 包含路径的上下文
 */
export default function createCtx(paths = {}, cwd){
  const { src = 'src', dist = 'dist', assets = 'assets', nodeModules = 'node_modules' } = paths;
  const app = realpathSync(cwd || getConfig('cwd'));

  return {
    cwd,
    paths: {
      src,
      dist,
      assets,
      nodeModules
    },
    realPaths: {
      app,
      src: resolve(app, src),
      dist: resolve(app, dist),
      assets: resolve(app, assets),
      nodeModules: resolve(app, nodeModules)
    }
  };
}