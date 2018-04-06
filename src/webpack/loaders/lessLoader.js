const lessLoader = {
  loader: 'less-loader',
  options: {
    javascriptEnabled: true,// 不加会报错 Inline JavaScript is not enabled. Is it set in your options?
    lint: false
  }
};

export default {
  loader: lessLoader
};
