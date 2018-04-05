module.exports = {
  entry: {
    index: './src/index.js',
  },
  resolve: {
    extensions: ['.web.js', '.js', '.json']// antd mobile资源减少打包体积
  },
  dll: ["react","react-dom","redux","react-redux","react-router","dva","babel-ployfill"],
  module: {
    babelLoaderOptions: {
      plugins: [
        [
          require.resolve('babel-plugin-import'),
          {
            "libraryName": "antd-mobile",
            "style": "css"
          }
        ],
        require.resolve('babel-plugin-transform-runtime')
      ]
    }
  }
}