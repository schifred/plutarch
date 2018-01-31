module.exports = {
  entry: {
    index: 'src/index'
  },
  extra: {
    babelPlugins: [
      [
        require.resolve('babel-plugin-import'),
        {
          "libraryName": "antd",
          "style": true
        }
      ],
      require.resolve('babel-plugin-transform-runtime'),
      require.resolve('babel-plugin-transform-decorators-legacy')
    ]
  }
};