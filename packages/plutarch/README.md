# plutarch

基于 webpack4 实现的前端应用开发工具。

### 快速上手

```bash
## 全局或本地安装
$ cnpm i plutarch -g

## 获取版本
$ plutarch -v
3.1.17

## 创建项目
$ plutarch init # 创建项目

## 本地开发
$ plutarch server

## 打包
$ plutarch build
$ plutarch build -p 语法环境打包

## storybook
$ plutarch story
```

## 配置

## webpack 配置项

| 选项 | 意义 | 默认值 |
| --- | --- | --- |
| mode | 模式，区分生产环境还是开发环境，可选值为 'production' 或 'development' | 'production' |
| template | 模板所在文件夹，默认扫描源目录 | undefined |
| entry | 入口文件，默认扫描源目录中的 js|tsx? 文件 | undefined |
| output | 出口 | undefined |
| publicPath | 设置 output.publicPath | undefined |
| resolve | 解析规则 | undefined |
| alias | 别名，默认扫描源目录下的文件夹 | undefined |
| devtool | sourcemap 生成规则，'development' 默认下默认 'source-map' | undefined |
| externals | 外部扩展 | undefined |
| target | 构建目标 | undefined |
| rules | 额外的加载器 | undefined |
| module | 内置加载器选项配置 | undefined |
| splitChunksOptions | 公共模块抽取，自动提取到 commons 文件内 | undefined |
| compress | 是否压缩 | true |
| enableCssModules | 是否开启 css modules | false |

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