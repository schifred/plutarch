import debug from 'debug';
import shell from 'shelljs';

import logger from '../logger';
import Context from '../Context';

const _debug = debug('plutarch');

const context = new Context();
const { paths: { app }, argv: { message, build } } = context;

if ( !message ){
  logger.red('message is required');
} else {
  try{
    shell.cd(app);

    if ( build ) shell.exec('plutarch build');

    shell.exec('git add .');
    shell.exec(`git commit -m ${message}`);
    shell.exec('git push')
  }catch(e){
    logger.red(e);
  };
};
