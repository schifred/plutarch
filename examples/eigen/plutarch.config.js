module.exports = {
  entry: {
    index: './src/index.js',
  },
  extra: {
    dll: {
      include: ["react","react-dom","redux","react-redux","react-router","dva"]
    }
  }
  // output: {
  //   path: './dist',
  //   publicPath: './dist'
  // }
}