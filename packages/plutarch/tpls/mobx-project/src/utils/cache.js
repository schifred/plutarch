let caches = {};

/**
 * 设置数据缓存
 * @param {string} mainKey 主键
 * @param {string} subKey 子健
 * @param {any} value 缓存数据
 */
export function set(mainKey, subKey, value) {
  if (!caches[mainKey]) caches[mainKey] = {};
  caches[mainKey][subKey] = value;
}

/**
 * 获取数据缓存
 * @param {string} mainKey 主键
 * @param {string} subKey 子健
 */
export function get(mainKey, subKey) {
  const cache = caches[mainKey];
  return cache && subKey !== undefined ? cache[subKey] : cache;
}

/**
 * 清除数据缓存
 * @param {string} mainKey 主键
 */
export function clear(mainKey) {
  if (mainKey) caches[mainKey] = undefined;
  else caches = {};
}
