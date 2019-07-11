module.exports = {
  entry: {
    index: 'src/index'
  },
  module: {
    babelLoaderOptions: {
      plugins: [
        [
          require.resolve('babel-plugin-import'),
          {
            "libraryName": "antd",
            "style": 'css'
          }
        ]
      ]
    }
  }
};