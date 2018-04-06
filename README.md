# plutarch

基于 webpack4 实现的前端应用开发工具。

### 快速上手

```bash
## 全局或本地安装
$ npm i plutarch -g

## 获取版本
$ plutarch -v
2.0.2

## 创建项目
$ plutarch init # 创建 dva 项目
$ plutarch init -t redux # 创建 redux 项目
$ plutarch init -t mobx # 创建 mobx 项目

## 本地开发
$ plutarch server

## 打包
$ plutarch build
```

## 配置

通过工程目录中的 plutarch.config.js 文件添加配置，配置将混入到默认的 webpack 配置中。

基本配置同 webpack，特别的，加载器使用对象形式加以配置，如 babelLoaderOptions 用于设置 babel-loader 加载器的选项，jsInclude 指定哪些文件需要通过 babel-loader 加以编译。暂时不提供配置插件的功能。

* entry，配置入口文件。
* output，配置输出规则。
* module，配置加载器规则，*Options 配置注入加载器的选项，*Test, *Include, *Exclude 指定加载器针对的模块。
* resolve，配置解析规则。
* devServer，配置调试服务器。
* devtool，限定 source map 导出形式。
* target，配置构建目标。
* externals，配置外部引入的类库。
* dll，配置使用 webpack.DllPlugin 编译的模块。

1. 函数形式

```Javascript
// plutarch.config.js
module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: 'index',
    publicPath: '/',
  },
  module: {
    babelLoaderOptions: {
      plugins: [
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
  },
  resolve: {
    alias: {
      utils: 'src/utils',
      config: 'src/utils/config'
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: {"^/api" : ""}
      }
    },
    port: 8001
  },
  devtool: 'cheap-module-eval-source-map',
  target: 'node',
  externals: ['react', 'react-dom']
}
```

2. 函数形式

```Javascript
module.exports = function(options){
  if ( this.isBuild ) options.devtool = 'nosources-source-map';

  return options;
};
```

## 数据模拟

通过 plutarch.mock.js 文件配置模拟数据，在dev server中直接挂载控制器实现。

1. 函数形式

```Javascript
// plutarch.mock.js
module.exports = function(app){
  app.get("/api/test.json",(req,res)=>{
    res.send("test");
  });
};
```

2. 对象形式

```Javascript
// plutarch.mock.js
module.exports = {
  "get /api/test.json": "test"
};
```

3. 文件控制器形式

```Javascript
// plutarch.mock.js
module.exports = {
  app.get("/api/test.json","test");
};
```

```Javascript
// mocks/test.js
module.exports = function(req,res){
  res.send("test");
};
```