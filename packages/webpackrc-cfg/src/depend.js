import { hyphen } from './utils';

/**
 * 依赖
 */
export let devDependencies = [];

/**
 * 添加依赖
 * @param {array|string} dependencies 依赖
 */
export function addDependency(dependencies){
  if ( !Array.isArray(dependencies) ){
    dependencies = [dependencies];
  };

  dependencies.map(dependency => {
    if ( devDependencies.indexOf(dependency) === -1 ){
      devDependencies.push(dependency);
    };
  });
};

/**
 * 移除依赖
 * @param {array|string} dependencies 依赖
 */
export function removeDependency(dependencies){
  if ( !Array.isArray(dependencies) ){
    dependencies = [dependencies];
  };

  dependencies.map(dependency => {
    devDependencies = devDependencies.filter(depend => depend !== dependency);
  });
};

export function transformDependencyName(name){
  name = name.replace(/_(?=[\d])/g, () => '-')
    .replace(/_(?=[^\d])/g, () => '');
  return hyphen(name);
};