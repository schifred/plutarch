const cssLoaderWithModules = {
  loader: 'css-loader',// translates CSS into CommonJS
  options: {
    importLoaders: 1,// 'css-loader'加载前的loader个数
    modules: true,
    camelCase: true,
    localIdentName: '[local]___[hash:base64:5]',
    sourceMap: true
  }
};

const cssLoaderWithoutModules = {
  loader: 'css-loader',// translates CSS into CommonJS
  options: {
    importLoaders: 1,// 'css-loader'加载前的loader个数
    sourceMap: true
  }
};

const cssLoaderWithModulesBuild = {
  loader: 'css-loader',// translates CSS into CommonJS
  options: {
    importLoaders: 1,// 'css-loader'加载前的loader个数
    modules: true,
    camelCase: true,
    localIdentName: '[local]___[hash:base64:5]',
    sourceMap: true,
    minimize: true
  }
};

const cssLoaderWithoutModulesBuild = {
  loader: 'css-loader',// translates CSS into CommonJS
  options: {
    importLoaders: 1,// 'css-loader'加载前的loader个数
    sourceMap: true,
    minimize: true
  }
};

export default {
  loader: cssLoaderWithoutModules,
  loaderBuild: cssLoaderWithoutModulesBuild,
  cssLoaderWithModules: cssLoaderWithModules,
  cssLoaderWithModulesBuild: cssLoaderWithModulesBuild,
  cssLoaderWithoutModules: cssLoaderWithoutModules,
  cssLoaderWithoutModulesBuild: cssLoaderWithoutModulesBuild
};
