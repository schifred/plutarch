# plutarch

基于webpack3实现的前端应用开发工具。

### 快速上手

```bash
## 全局或本地安装
$ npm i plutarch -g

## 获取版本
$ plutarch -v
1.0.3

## 创建redux项目，默认创建dva项目
$ plutarch init -t redux

## 本地开发
$ plutarch server

## 打包
$ plutarch build
```

## 配置

通过工程目录中的plutarch.config.js文件添加配置。基本配置同webpack，extra属性用于添加特殊配置。

plutarch.config.js

  module.exports = {
    entry: {
      index: "./src/index.js"
    }
  }

### webpack配置项

参考文档：
[webpack 3.10.0 官方文档](https://webpack.js.org/configuration/)
[webpack 3.5.5 中文文档](http://www.css88.com/doc/webpack)

* entry 入口文件，字符串、数组或对象形式（对象属性可以是数组形式），如 entry: './path/to/my/entry/file.js' 或 { app: './src/app.js', vendors: './src/vendors.js' }。通常vendors用于配置第三方库。

* output.filename 输出文件名，如 output.filename: 'bundle.js' 或 '[name].js'。其中，name占位符会自动填充为待打包脚本。
* output.path 输出目录的绝对路径，如 output.path: __dirname + '/dist'。
* output.pathinfo 打包文件是否以注释形式包含加载的模块，默认值为false。生产环境需要置为false。
* output.publicPath 资源文件的引用路径，绝对或相对路径，如 output.publicPath: 'https://cdn.example.com/assets/'（获取cdn资源） 或 '/assets/'（相对服务器检索资源） 或 '../assets/'（相对html页面检索资源）。默认为''。
* output.library，开发类库时将其导出为独立发布的文件时配置，配置为libaryName。
* output.libraryExport，配置导出的内容，默认值为 _entry_return_ ，即将全文件导出。若配置为 _entry_return_.default ，只导出default属性。
* output.libraryTarget，类库导出格式，默认值为'var'。可选值包含'var'（导出为变量），'this'（导出为this的属性），'commonjs'（导出为exports的属性，即node脚本的方法），'commonjs2'（通过module.exports导出，即node的一个模块），'amd'（requirejs模块化规范导出模块），'umd'（以AMD，CommonJS2 形式导出或者导出为 root 的属性）。
* output.chunkFilename，非入口文件，如require.ensure异步加载的脚本。配置同entry，如 output.chunkFilename: '[name].async.js'。
* output.chunkLoadTimeout，设置异步脚本的超时时间，默认为120000。
* output.crossOriginLoading，启用jsonp跨域加载脚本，默认值为false，即不允许；可配置为'anonymous'（允许跨域，发送不带凭据的请求）或'use-credentials'（允许跨域，发送待凭据的请求）。
* output.jsonpScriptType，自定义jsonp脚本script节点的type值，默认为'text/javascript'。可配置为'module'，以es6形式加载脚本。
* output.sourceMapFilename，SourceMap文件名，默认值为'[file].map'.
* output.hotUpdateChunkFilename，热更新加载的文件名，默认值为'[id].[hash].hot-update.js'。
* output.hotUpdateFunction，热更新加载的jsonp函数名，默认值为'webpackHotUpdate'。
* output.hotUpdateMainFilename，热更新加载的主文件名 ，默认值为'[hash].hot-update.json'。
* output.jsonpFunction，异步加载chunk的jsonp函数名，默认值为'webpackJsonp'。

* module.noParse，无需webpack解析的文件名，正则或函数形式，如 module.noParse: /jquery|lodash/ 或 module.noParse: function(content) { return /jquery|lodash/.test(content); }。
* module.rules，配置加载器，如 module.rules: [{ test: /\.ts$/, use: 'ts-loader' }]。

  - conditions 条件：配置 resource 待加载的资源文件，issuer 请求资源的脚本。
  
  - rule.test，资源文件名须匹配的条件，可以是正则，或正则数组，或字符串，或函数（返回真值匹配），或对象（匹配所有属性），下同。与rule.resource属性相冲。
  - rule.include，资源文件所在目录。
  - rule.exclude，资源文件排除的目录。
  - rule.and，资源文件名须匹配所有条件。
  - rule.or，资源文件名须匹配其中一条条件。
  - rule.not，资源文件名须排除的条件。
  - rule.resourceQuery，加载文件时须匹配的查询字符串，如 rule.resourceQuery : /inline/，可使用 import Foo from './foo.css?inline'。
  - rule.resource，资源文件匹配的规则，可以用rule.test, rule.include, rule.exclude替代配置。
  - rule.issuer，请求资源的脚本文件名。

  - rule.use，指定加载器，数组形式。
  - rule.use.loader，指定加载器，如 use: [ { loader: "style-loader "} ]，简写形式为use: [ "style-loader" ]。
  - rule.use.options | rule.use.query，传入loader的配置项，如 use: [{ loader: "css-loader", options: { modules: true } }。
  
  - rule.parser，配置解析选项，约定模块可以使用的模块化加载语法，默认值为
    parser: {
      amd: false, // 禁用 AMD
      commonjs: false, // 禁用 CommonJS
      system: false, // 禁用 SystemJS
      harmony: false, // 禁用 ES2015 Harmony import/export
      requireInclude: false, // 禁用 require.include
      requireEnsure: false, // 禁用 require.ensure
      requireContext: false, // 禁用 require.context
      browserify: false, // 禁用特殊处理的 browserify bundle
      requireJs: false, // 禁用 requirejs.*
      node: false, // 禁用 __dirname, __filename, module, require.extensions, require.main 等。
      node: {...} // 在模块级别(module level)上重新配置 [node](/configuration/node) 层(layer)
    }

  - rule.rules，配置嵌套规则。
  - rule.oneOf，以数组顺序优先选用嵌套规则，如
    use: [{
      test: /.css$/,
      oneOf: [
        {
          resourceQuery: /inline/, // foo.css?inline
          use: 'url-loader'
        },
        {
          resourceQuery: /external/, // foo.css?external
          use: 'file-loader'
        }
      ]
    }]

  - rule.enforce，指定 loader 调用顺序，可选值为'pre'（前置）, 'inline'（行内）, 'normal'（普通）, 'post'（后置），留空即为默认值'normal'。

* resolve.alias，配置资源文件的别名，影响 webpack 查找资源的方式。
* resolve.enforceExtension，是否允许加载无扩展名的文件，默认为 false。
* resolve.extensions，自动解析的文件扩展名，默认值为 extensions: [".js", ".json"]。
* resolve.mainFields，决定类库导入的方式，默认值为 mainFields: ["browser", "module", "main"]，即优先以类库 package.json 文件中'browser'属性导入模块，其次'module'，其次'main'。
* resolve.mainFiles，解析目录时使用的文件名，默认值为 mainFiles: ["index"]。
* resolve.modules，告诉 webpack 在哪个目录中查找模块，如 modules: [path.resolve(__dirname, "src"), "node_modules"]。
* resolve.unsafeCache，指定需要缓存的模块，默认为 unsafeCache: true。unsafeCache: /src\/utilities/配置只缓存utilities模块。
* resolve.plugins，额外使用的解析插件列表，如 plugins: [new DirectoryNamedWebpackPlugin()]。
* resolve.cachePredicate，指定异步加载脚本是否需要被缓存，函数形式，默认值为 cachePredicate: function() { return true }。
* resolve.resolveLoader，指定 webpack 查找loader的方式，如resolveLoader: {  modules: ["node_modules"], extensions: [".js", ".json"], mainFields: ["loader", "main"] }。
* resolveLoader.moduleExtensions，rule.use配置loader时待添加的后缀。

* devtool，压缩脚本通过SourceMap查找实际的报错行号。开发环境可配置为'cheap-module-eval-source-map'；生产环境可配置为'nosources-source-map'。

* target，指定编译文件适配的环境，字符串或函数。字符串可选值为'web'（浏览器环境，默认值），'node'（类node环境，使用require加载文件）等。函数形式为 compiler => {}。

* externals，打包时无需编译的模块，由外部注入，如externals: { jquery: 'jQuery' }。

### plutarch特殊配置

通过在plutarch.config.js文件导出对象的extra属性中配置。

```bash
extra: {
  define, // 定义通过 WebpackDefinePlugin 插件注入页面的变量，对象形式
  externals,// 即 webpack 中 externals 配置项，打包时无需编译的模块
  resolveExtensions,// 即 webpack 中 resolve.extensions 配置项，自动解析的扩展名
  babelIncludes,// 指定需要通过 babel 编译的脚本文件，src 目录文件除外，数据格式为相对项目目录路径字符串数组
  babelPresets,// babel-preset 额外配置，react, env, stage-0 已配置
  babelPlugins,// babel-plugin 额外配置，add-module-exports、syntax-dynamic-import、react-require 已配置
  cssModules,// 是否开启css modules编译src文件夹下的css脚本，默认为否
  cssModulesExclude,// 启用css modules编译css脚本时需排除的文件，字符串、数组、正则或函数形式
  cssModulesIncludes,// 启用css modules编译的css脚本，src 目录文件除外，数据格式为相对项目目录路径字符串数组
  dll,// 

};
```

### 其他配置

devServer: {
  proxy: {

  }
}

## 数据模拟

通过plutarch.mock.js文件或mocks文件夹配置数据模拟脚本，在dev server中直接挂载控制器实现。

### plutarch.mock.js

```bash
module.exports = function(app){

  app.get("/api/test.json",(req,res)=>{
    res.send("test");
  });

};

// 或者
module.exports = {
  "get /api/test.json": "test"
};

// 或者
module.exports = {
  app.get("/api/test.json","mocks.test");
};
```

### mocks/test.js

```bash
module.exports = function(req,res){
  res.send("test");
};
```