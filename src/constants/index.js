'use strict';

export const PlutarchConfigPath = 'plutarch.config.js';
export const PlutarchServerPath = 'plutarch.server.js';
export const PlutarchMockPath = 'plutarch.mock.js';
export const PlutarchMocksPath = 'mocks';

export const BabelOptions = {
  babelrc: false,
  presets: [ 
    require.resolve('babel-preset-react'),// “babel-preset-env”用于替代es015
    require.resolve('babel-preset-env'), 
    require.resolve('babel-preset-stage-0'), 
  ],
  plugins: [ 
    // require.resolve('babel-plugin-transform-decorators-legacy'), 
    // require.resolve('babel-plugin-transform-runtime'), 
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-syntax-dynamic-import'),
    require.resolve('babel-plugin-react-require')
  ],
  cacheDirectory: true
};
