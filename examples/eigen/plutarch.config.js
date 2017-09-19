module.exports = {
  entry: {
    index: './src/index.js',
  },
  dll: {
    include: ["react","react-dom","redux","react-redux","react-router","dva","babel-ployfill"]
  }
  // output: {
  //   path: './dist',
  //   publicPath: './dist'
  // }
}