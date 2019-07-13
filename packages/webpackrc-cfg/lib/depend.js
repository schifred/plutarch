"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDependency = addDependency;
exports.removeDependency = removeDependency;
exports.transformDependencyName = transformDependencyName;
exports.devDependencies = void 0;

var _utils = require("./utils");

/**
 * 依赖
 */
let devDependencies = [];
/**
 * 添加依赖
 * @param {array|string} dependencies 依赖
 */

exports.devDependencies = devDependencies;

function addDependency(dependencies) {
  if (!Array.isArray(dependencies)) {
    dependencies = [dependencies];
  }

  ;
  dependencies.map(dependency => {
    if (devDependencies.indexOf(dependency) === -1) {
      devDependencies.push(dependency);
    }

    ;
  });
}

;
/**
 * 移除依赖
 * @param {array|string} dependencies 依赖
 */

function removeDependency(dependencies) {
  if (!Array.isArray(dependencies)) {
    dependencies = [dependencies];
  }

  ;
  dependencies.map(dependency => {
    exports.devDependencies = devDependencies = devDependencies.filter(depend => depend !== dependency);
  });
}

;

function transformDependencyName(name) {
  name = name.replace(/_(?=[\d])/g, () => '-').replace(/_(?=[^\d])/g, () => '');
  return (0, _utils.hyphen)(name);
}

;