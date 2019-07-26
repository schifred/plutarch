import fs from 'fs';
import path from 'path';
import debug from 'debug';
import execa from 'execa';
import cp from 'child_process';
import unparse from 'dargs';
import Context from '../Context';
import BaseCompiler from '../webpack/BaseCompiler';
import install from '../utils/install';
import copy from '../utils/copy';
import stringify from '../utils/stringify';
import fork from '../utils/fork';
import * as constants from '../constants';

async function run() {
  const ctx = new Context();
  const { cwd } = ctx.env;
  const { npm, config, build, port, output } = ctx.argv;

  const installFlag = install([
    'typescript', 'react-docgen-typescript-loader', 
    'autoprefixer', '@storybook/core', '@storybook/react', 
    '@storybook/addon-actions', 
    '@storybook/addon-links', '@storybook/addon-info'
  ], { npm });
  if ( !installFlag ) return;
  
  const cfgDir = path.resolve(cwd, `./${config}`);
  if ( !fs.existsSync(cfgDir) ) {
    fs.mkdirSync(cfgDir);
  };

  copy(
    path.resolve(__dirname, `../story/react.config.js`),
    path.resolve(cwd, `./${config}/config.js`),
  );
  copy(
    path.resolve(__dirname, `../story/addon.js`),
    path.resolve(cwd, `./${config}/addon.js`),
  );

  const webpackrc = path.resolve(cwd, `./${config}/webpack.config.js`);
  const opts = require(ctx.paths.plrc);// 客户配置
  const compiler = new BaseCompiler(opts, ctx);
  const webpackConfig = await compiler.generate(!build ? 'development' : 'production');

  const jsloader = webpackConfig.module.rules[0];
  const lessloader = webpackConfig.module.rules[5].loader;

  fs.writeFileSync(webpackrc, 
`module.exports = ({config}) => {
  config.module.rules.shift();
  const jsloader = ${stringify(jsloader)};
  config.module.rules.unshift(jsloader);
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      ...jsloader.loader,
      {
        loader: "${require.resolve('ts-loader')}",
        options: {
          transpileOnly: true,
        },
      },
      require.resolve('react-docgen-typescript-loader'),
    ],
  });
  config.module.rules.push({
    test: /\.less$/,
    use: [
      "${require.resolve('style-loader')}", 
      ${stringify(lessloader[1])},
      { loader: "${require.resolve('postcss-loader')}", 
        options: {
          plugins: [require("autoprefixer")("last 100 versions")]
        },
      },
      "${require.resolve('less-loader')}"
    ],
  });
  config.resolve.alias = {
    ...config.resolve.alias, 
    ...${JSON.stringify(webpackConfig.resolve.alias)}
  };
  config.resolve.extensions = [
    ...config.resolve.extensions, 
    ...${JSON.stringify(webpackConfig.resolve.extensions)}
  ];
  return config;
};`);

  const binPath = path.resolve(cwd, 
    `./node_modules/@storybook/react/bin/${!build ? 'index' : 'build'}.js`);
  const forkNodeArgv = [...new Set(unparse({
    port,
    config,
    'output-dir': output
  }))];

  fork(binPath, ['', ...forkNodeArgv], {
    cwd,
  });
}

run();
