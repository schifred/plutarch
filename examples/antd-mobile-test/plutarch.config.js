module.exports = {
  entry: {
    index: './src/index.js',
  },
  resolve: {
    extensions: ['.web.js', '.js', '.json']// antd mobile资源减少打包体积
  },
  extra: {
    dll: {
      include: ["react","react-dom","redux","react-redux","react-router","dva","babel-ployfill"]
    },
    babelPlugins: [
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