import { resolve } from 'path';
import { override } from 'core-decorators';

import AbstractOptions from './AbstractOptions';

class DefaultOptions extends AbstractOptions {
  constructor(context, isBuild){
    super(context, isBuild);
    this.init();
  }

  @override
  setMode(opts){
    const { isBuild } = this;
    this.config.mode = isBuild ? 'production' : 'development';
  }

  @override
  setContext(opts){
    let { config } = this;
    config.context = resolve(__dirname, '../../');
  }

  @override
  setEntry(opts){
    const { context, isBuild, helpers } = this;
    const { paths: { src, devClient } } = context;
    const files = helpers.getFiles(src);
    
    this.config.entry = isBuild ? files : {
      ...files,
      devClient
    };
  }

  @override
  setOutput(opts){
    const { context, isBuild } = this;
    const { paths: { dist } } = context;

    this.config.output = {
      path: dist,// 输出目录的绝对路径
      pathinfo: false,// 打包文件是否添加包含模块的注释，默认为 false
      publicPath: isBuild ? './' : '/',// 浏览器端访问资源时的公开路径，作为前缀
      filename: "[name].js",// 输出文件名
      chunkFilename: "[name].async.js",// 按需加载的非入口文件名，require.ensure异步加载脚本文件
      chunkLoadTimeout: 120000,// 访问按需加载资源的超时时间，默认为120000
      jsonpFunction: 'webpackJsonp',// 按需加载资源的 jsonp 函数名，默认为 'webpackJsonp'
      jsonpScriptType: 'text/javascript',// jsonp 注入 script 节点的 type 值，默认为 'text/javascript'
      crossOriginLoading: false,// 是否启用 jsonp 跨域加载脚本，默认值为 false
      // library: libaryName,// 开发类库时配置，配置为 libaryName 类库名
      // libraryTarget: 'var',// 类库导出格式，默认值为 'var'
      // libraryExport: '_entryreturn',// 配置导出的内容，默认值为 '_entryreturn'，完全导出模块
      // auxiliaryComment: '',// 导出类库时，用于在导出容器中添加注释
      // umdNamedDefine: false,// libraryTarget 为 'umd' 时，umdNamedDefine 真值将对 AMD 模块进行命名
      sourceMapFilename: '[file].map',// source map文件名，默认值为 '[file].map'
      // devtoolModuleFilenameTemplate,// 定义每个 source map 的 sources 数组项名称，模板字符串或函数
      // devtoolFallbackModuleFilenameTemplate,// devtoolModuleFilenameTemplate 的替代方案
      hotUpdateChunkFilename: '[id].[hash].hot-update.js',// 热更新文件名，默认为 '[id].[hash].hot-update.js'
      hotUpdateFunction: 'webpackHotUpdate',// 热更新加载的 jsonp 函数名，默认为 'webpackHotUpdate'
      hotUpdateMainFilename: '[hash].hot-update.json',// 热更新的主文件名，默认为 '[hash].hot-update.json'
      hashDigest: 'hex',// 生成 hash 的编码方式，默认为 'hex'
      // hashDigestLength,// 散列摘要的前缀长度
      // hashFunction,// 散列算法
      // hashSalt,// 可选的加盐值
      strictModuleExceptionHandling: false,// 重复加载错误模块是否只报错一次
      sourcePrefix: '',// 配置打包文件每行的前缀，默认为 ''
    };
  }

  @override
  setModule(opts){
    const defaultRules = this.convertLoadersToRules();
    this.config.module = {
      rules: defaultRules
    };
  }

  @override
  setResolve(opts){
    const { context } = this;
    const { paths: { src, nodeModules, buildinNodeModules } } = context;

    this.config.resolve = {
      modules: [ src, nodeModules, buildinNodeModules ],// 在哪个目录中查找模块
      extensions: [ '.web.js', '.js', '.jsx', '.tsx', '.json' ],// 自动解析的文件扩展名
      // alias,// 配置资源文件的别名
      // enforceExtension: false,// 是否允许加载无扩展名的文件，默认为 false
      mainFields: ['browser', 'module', 'main'],// 按 package.json 哪个字段查询模块入口，默认为 ['browser', 'module', 'main']
      mainFiles: ['index'],// 解析目录时使用的文件名，默认为 ['index']
      unsafeCache: true,// 指定需要缓存的模块，默认为 true
      // plugins,// 额外使用的解析插件列表
      cachePredicate(){ return true },// 异步加载脚本是否需要被缓存，函数形式
      // resolveLoader: { // 指定 webpack 查找loader的方式
      //   modules: ['node_modules'], 
      //   extensions: ['.js', '.json'], 
      //   mainFields: ['loader', 'main'] 
      // },
      // moduleExtensions,// rule.use配置loader时待添加的后缀
    };
  }

  @override
  setPlugins(opts){
    const defaultPlugins = this.getDefaultPlugins();
    this.config.plugins = defaultPlugins;
  }

  @override
  setDevServer(opts){
    const { context } = this;
    const { paths: { src, dist, nodeModules, assert } } = context;

    this.config.devServer = {
      inline: true,// 处理实时重载的 js 脚本以内联模式插入到页面中
      hot: true,// 模块热替换
      hotOnly: true,// 热替换时，编译失败时是否禁止刷新页面
      open: true,// 是否自动打开浏览器
      openPage: '',// 打开浏览器时指定页面
      overlay: {// 浏览器端显示构建失败和警告信息
        warnings: true, 
        errors: true 
      },
      useLocalIp: true,// 浏览器端以 ip 打开网页
      historyApiFallback: true,// 404 错误页面将重定向到 index.html
      // proxy: {},// 配置代理
      // setup(app){},// 为调试服务器添加钩子或中间件
      quiet: false,// 是否关闭控制台日志打印
      clientLogLevel: 'warning',// 控制台打印日志级别
      progress: true,// 将运行进度输出到控制台
      stats: {//终端中输出结果为彩色
        colors: true
      },
      host: '127.0.0.1',
      port: 3001,
      publicPath: '/',// 浏览器端访问打包文件的路径，默认为 '/'
      contentBase: assert,// 额外的静态资源所在目录
      watchContentBase: true,// 监听 contentBase 静态资源改动
      staticOptions: {},// 配置通过 contentBase 访问的静态资源选项
      headers: {},// 在所有响应中添加头部配置
      disableHostCheck: false,// 是否禁用请求头 host 检查
      // allowedHosts: [],// 校验请求头中的 host 主机，匹配的予以访问权限
      compress: true,// 服务是否通过 gzip 压缩
      // https: {},// 启动 https 服务，默认启动 http 服务
      // socket: 'socket',// 使用Unix socket通信
      // pfx,// 配置数字证书ssl pfx的路径
      // pfxPassphrase,// 访问数字证书ssl pfx的密码
      // stdin: false,// 是否在标准输入停止时关闭 dev server
      watchOptions: {// 监听配置
        aggregateTimeout: 300,// 时间段内的文件改动将一次性影响 webpack 的编译过程，默认为 300
        ignored: /node_modules/,// 避免监听某些文件的改动，节省内存开销，可以配置为 "files/**/*.js"
        poll: 1000// 布尔值或数值，真值开启轮询，监听文件变动；数值时，以该时间间隔检查文件变动
      },
    };
  }

  @override
  setDevtool(opts){
    const { isBuild } = this;
    this.config.devtool = isBuild ? 'cheap-module-eval-source-map' : 'nosources-source-map';
  }

  @override
  setTarget(opts){
    this.config.target = 'web';
  }

  @override
  setPerformance(opts){
    const { isBuild } = this;
    this.config.performance = {
      assetFilter(assetFilename){// 需要计算最大体积以节省性能的文件
        return assetFilename.endsWith('.js');
      },
      maxAssetSize: 12500000,// 限制所有单个资源的最大体积
      maxEntrypointSize: 12500000,// 限制入口文件打包时的最大体积
      hints: isBuild ? 'error' : 'warning'// 资源过大时提示级别
    };
  }

  @override
  setOptimization(opts){
    const { isBuild } = this;
    this.config.optimization = {
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      minimize: isBuild ? true : false
    };
  }

};

export default DefaultOptions;
