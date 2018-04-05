import eslintFormatter from 'react-dev-utils/eslintFormatter';

// js代码检测
// 参考文档：[ESLint 介绍](https://www.jianshu.com/p/9724ad299ff6)
const eslintLoader = {
  loader: 'eslint-loader',
  options: {
    formatter: eslintFormatter,
    useEslintrc: false,
    baseConfig: {
      extends: [ require.resolve('eslint-config-react-app') ],
    },
  }
};

export default {
  loader: eslintLoader
};
