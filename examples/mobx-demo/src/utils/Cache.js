let caches = {};

export default class Cache {
  // 设置数据缓存
  setCache(actionName, key, value){
    if ( !caches[actionName] ) caches[actionName] = {};
    caches[actionName][key] = value;
  }

  // 获取数据缓存
  getCache(actionName, key){
    const cache = caches[actionName];
    return cache && key !== undefined ? cache[key] : cache;
  }

  // 清除数据缓存
  clearCache(actionName){
    caches[actionName] = undefined;
  }
}