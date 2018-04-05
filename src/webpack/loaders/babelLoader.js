// babel-loader
// 参考文档：[babel options](https://babeljs.io/docs/usage/api/#options)
const babelLoader = {
  loader: 'babel-loader',
  options: {
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
    cacheDirectory: true,// 缓存babel-loader编译结果
  }
};

export default {
  loader: babelLoader
};
