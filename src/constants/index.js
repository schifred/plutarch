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

export const CssLoadersWithModules = [{
  loader: 'style-loader'// creates style nodes from JS strings
}, {
  loader: 'css-loader',// translates CSS into CommonJS
  options: {
    importLoaders: 1,// 'css-loader'加载前的loader个数
    modules: true,
    camelCase: true,
    localIdentName: '[local]___[hash:base64:5]',
    sourceMap: true
  }
}, {
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('autoprefixer')()
    ]
  }
}];

export const CssLoadersWithoutModules = [{
  loader: 'style-loader'// creates style nodes from JS strings
}, {
  loader: 'css-loader',// translates CSS into CommonJS
  options: {
    importLoaders: 1,// 'css-loader'加载前的loader个数
    sourceMap: true
  }
}, {
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('autoprefixer')()
    ]
  }
}];