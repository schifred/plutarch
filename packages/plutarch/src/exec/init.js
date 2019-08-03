import debug from 'debug';
import { resolve, basename } from 'path';
import { writeFileSync } from 'fs';
import shell from 'shelljs';
import inquirer from 'inquirer';
import { merge } from 'lodash';
import stringify from "../utils/stringify";

import logger from '../logger';
import Context from '../Context';

const _debug = debug('plutarch');

const context = new Context();
const { paths: { app, tpls } } = context;

inquirer.prompt([{
  type: 'list',
  name: 'type',
  message: 'which project do you want to initilize?',
  choices: ['dva', 'redux', 'mobx', 'lib']
}, {
  type: 'input',
  name: 'name',
  message: `project name: `,
  default: basename(app)
}, {
  type: 'input',
  name: 'version',
  message: `version: `,
  default: '0.0.1'
}, {
  type: 'input',
  name: 'description',
  message: `description: `
}, {
  type: 'input',
  name: 'entry',
  message: `entry point: `,
  default: 'index.js'
}, {
  type: 'input',
  name: 'keywords',
  message: 'keywords: '
}, {
  type: 'input',
  name: 'git',
  message: 'git repository: '
}, {
  type: 'input',
  name: 'author',
  message: 'author: '
}, {
  type: 'input',
  name: 'license',
  message: 'license: ',
  default: 'ISC'
}]).then(answers => {
  const { type, entry, keywords, git, ...pkgConifg } = answers;

  _debug(`init ${type} project`);

  const tplPath = resolve(tpls, `${type}-project`);
  const pkgPath = resolve(app, 'package.json');
  let pkg = require(resolve(tplPath, 'package.json'));
  pkg = merge(pkg, {
    ...pkgConifg,
    main: entry,
    keywords: keywords ? keywords : [],
    repository: {
      type: 'git',
      url: git
    },
  });

  try{
    logger.blue(`begin to initilaize ${type} project`);

    shell.cp('-R', `${tplPath}/*`, app);

    writeFileSync(pkgPath, stringify(pkg), { encoding: 'utf8' });

    logger.blue('loading dependencies');
  }catch(e){
    logger.red(e);
  };
});
