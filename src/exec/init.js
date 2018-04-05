import debug from 'debug';
import { resolve } from 'path';
import shell from 'shelljs';

import logger from '../logger';
import Context from '../Context';

const _debug = debug('plutarch');

const context = new Context();
const { paths: { app, tpls }, argv: { type } } = context;
const tplPath = resolve(tpls, `${type}-project`);

_debug(`init ${type} project`);

try{
  shell.cp('-R', tplPath, app);
}catch(e){
  logger.red(e);
};
