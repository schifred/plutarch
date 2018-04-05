import { existsSync, statSync } from 'fs';
import { isFunction, isPlainObject } from 'lodash';
import Router from './Router';

function applyMockRoutes(app, context){
  const { paths: { plmc, plmcs } } = context;
  
  // 路由配置文件 plutarch.mock.js，仅支持文件形式
  if ( !existsSync(plmc) || !statSync(plmc).isFile() ) return;

  const router = new Router(app, context);
  const mockRouter = require(plmc);

  if ( !isFunction(mockRouter) || !isPlainObject(mockRouter) )
    throw new Error("plutarch.mock.js should export a function or an object")

  if ( isFunction(mockRouter) ){
    mockRouter(router);
    return;
  };

  Object.keys(mockRouter).map(key => {
    let matches = key.split(/\s/);
    let method = matches[0];
    let path = matches[1];
    
    router[method](path, mockRouter[key]);
  });

};

export default applyMockRoutes;
