import { dirname } from 'path';

interface Options {
  /** 编译成何种模块 */
  modules?: string,
  /** 支持的浏览器内核 */
  targets?: object,
  /** 不必打包的文件 */
  exclude?: Array<string>,
  /** loose 模式 */
  loose?: boolean,
  /** babel-plugin-env 配置 */
  env?: object,
  /** babel-plugin-transform-runtime 配置 */
  transformRuntime?: object,
  /** 是否浏览器环境 */
  isBrowser?: boolean,
  /** 是否 tss */
  isTS?: boolean,
}

export default function (_: object, opts: Options = {}) {
  const nodeEnv = process.env.NODE_ENV;
  const {
    modules,
    exclude,
    loose = false,
    env = {},
    transformRuntime = true,
    isBrowser = true,
    isTS = true,
  } = opts;
  const targets = 'targets' in opts ? opts.targets :
    isBrowser ? { browsers: ['last 2 versions', 'IE >= 9'] } : { node: 6 };

  const presets: Array<any> = [
    [
      require.resolve('@babel/preset-env'),
      {
        targets,
        loose,
        // https://segmentfault.com/q/1010000018937075/a-1020000018937692
        // useBuiltIns 不能和 transform-runtime 一起使用；corejs 选项必须结合 useBuiltIns
        // useBuiltIns: 'usage',
        // corejs: '2',
        modules: modules ? modules : 
          isBrowser ? false : 'commonjs',// 设置成 'commonjs' 将使懒加载失效
        // https://stackoverflow.com/questions/43042889/typescript-referenceerror-exports-is-not-defined    
        exclude,
        ...env,
      },
    ],
  ]

  let plugins: Array<any> = [
    // Stage 0
    require.resolve('@babel/plugin-proposal-function-bind'),
    // Stage 1
    require.resolve('@babel/plugin-proposal-export-default-from'),
    require.resolve('@babel/plugin-proposal-logical-assignment-operators'),
    [require.resolve('@babel/plugin-proposal-optional-chaining'), { loose }],
    [
      require.resolve('@babel/plugin-proposal-pipeline-operator'),
      { 'proposal': "minimal" }
    ],
    [
      require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
      { loose }
    ],
    require.resolve('@babel/plugin-proposal-do-expressions'),
    // Stage 2
    [
      require.resolve('@babel/plugin-proposal-decorators'),
      { 'legacy': true }
    ],
    require.resolve('@babel/plugin-proposal-function-sent'),
    require.resolve('@babel/plugin-proposal-export-namespace-from'),
    require.resolve('@babel/plugin-proposal-numeric-separator'),
    require.resolve('@babel/plugin-proposal-throw-expressions'),
    // Stage 3
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-syntax-import-meta'),
    [
      require.resolve('@babel/plugin-proposal-class-properties'),
      { 'loose': true }
    ],
    require.resolve('@babel/plugin-proposal-json-strings'),
  ];

  if (isTS) {
    presets.push(require.resolve('@babel/preset-typescript'));
  }
  if (isBrowser) {
    presets.push(require.resolve('@babel/preset-react'));
  }

  if (transformRuntime) {
    plugins.push([
      require.resolve('@babel/plugin-transform-runtime'),
      typeof transformRuntime === "object" ? transformRuntime : {
        absoluteRuntime: dirname(require.resolve('../package')),
        corejs: {
          version: 2
        }
      },
    ]);
  }

  if (nodeEnv === 'production') {
    plugins.push(
      require.resolve('babel-plugin-transform-react-remove-prop-types'),
    );
  }

  return {
    presets,
    plugins,
  }
}