module.exports = {
  module: {
    babel: {
      plugins: [
        [
          require.resolve('babel-plugin-import'),
          {
            "libraryName": "antd",
            "style": "css"
          }
        ]
      ]
    },
    // eslint: {}
  },
  aaa: 111,
  output: {
    chunkFilename: '[id].js'
  }
};