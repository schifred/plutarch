# plutarch

基于 webpack4 实现的前端应用开发工具。

### 快速上手

```bash
## 全局或本地安装
$ cnpm i plutarch -g

## 获取版本
$ plutarch -v
3.1.3

## 创建项目
$ plutarch init # 创建 dva 项目
$ plutarch init -t redux # 创建 redux 项目
$ plutarch init -t mobx # 创建 mobx 项目

## 本地开发
$ plutarch server

## 打包
$ plutarch build

## storybook
$ plutarch story
```

## 配置

[webpackrc-cfg](https://github.com/Alfred-sg/webpackrc-cfg)

### 配置文件

* .plutarch/dev.config.js 本地调试环境配置文件。
* .plutarch/pre.config.js 预发环境配置文件。
* .plutarch/prod.config.js 生产环境配置文件。

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