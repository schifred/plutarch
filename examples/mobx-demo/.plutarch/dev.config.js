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
  devtool: 'cheap-module-eval-source-map',
};