// url-loader 内部封装了 file-loader，大于限制长度的采用 file-loader 加载
// url-loader加载图片时，import img from imgPath 将生成图片路径，css导入以相对路径形式
const urlLoader = {
  loader: 'url-loader',
  options: {
    limit: 10000
  }
};

export default {
  loader: urlLoader
};
