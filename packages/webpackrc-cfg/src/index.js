import webpack from 'webpack';
import { config } from './apis/config';
import WebpackConfig from './apis/WebpackConfig';
import getWebpackConfig from './apis/getWebpackConfig';
import { install, installDependencies } from './apis/installDependencies';

export default {
  webpack,
  config,
  WebpackConfig,
  getWebpackConfig,
  installDependencies,
  install
};