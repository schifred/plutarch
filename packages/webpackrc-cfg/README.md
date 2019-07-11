# webpackrc-cfg

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

## 上下文

| 选项 | 意义 | 默认值 |
| --- | --- | --- |
| npm | 所使用的包管理器名 | 'npm' |
| cwd | cwd，默认 process.cwd() | process.cwd() |
| paths | 工程目录相关 | 见示例 |
| entry | 入口文件，默认扫描源目录中的 js|tsx? 文件 | undefined |

## 示例

```Javascript
import { getWebpackConfig } from 'webpackrc-cfg';

const webpackConfig = getWebpackConfig({
  mode: 'production',// 值为 'production' 或 'development'，默认 'production'
  template: '../examples',// 模板所在文件夹
  entry: { index: 'src/index.js' },// 入口文件，默认扫描源目录下的 js 文件获得
  output: { path },// 出口
  publicPath: './',// output.publicPath
  resolve: {},// 解析
  alias: { components: 'src/components' },// 别名，默认扫描源目录下的文件夹
  devtool: 'source-map',// 'development' 下默认 'source-map'
  externals: { react: 'React' },// 外部扩展
  target: 'node',// 构建目标
  rules: [{ test: /\.vue$/, loader: 'vue-loader' }],// 额外的加载器
  module: {
    eslint: {},// 开启 eslint 校验
    babel: { plugins, presets },// 定义额外 babel 的配置
    ts: {  },// 定义额外 ts 的配置
    css: { modules: false },// 定义额外 css 的配置
  },
  splitChunksOptions: {// 公共模块抽取，自动提取到 commons 文件内
    minSize: 1000
  },
  compress: false// 是否压缩
}, {
  npm: 'cnpm',// 依赖安装命令
  cwd: 'workspace',// 工作目录，默认 process.cwd()
  paths: {
    src: 'src',// 源目录，默认 'src' 目录
    dist: 'dist',// 目标目录，默认 'dist' 目录
    assets: 'assets',// 静态资源，默认 'assets' 目录
    nodeModules: 'node_modules'// 依赖目录，默认 'node_modules' 目录
  }
});
```
