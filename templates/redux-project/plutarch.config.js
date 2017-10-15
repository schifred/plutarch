module.exports = {
  entry: {
    index: 'src/index'
  },
  // resolve: {
  //   alias: {
  //     utils: 'src/utils',
  //     config: 'src/utils/config'
  //   }
  // },
  extra: {
    babelPlugins: [
      [
        require.resolve('babel-plugin-import'),
        {
          "libraryName": "antd",
          "style": true
        }
      ],
      require.resolve('babel-plugin-transform-runtime')
    ]
  }
};