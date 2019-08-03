const context = require.context("stores", true, /\.js$/);

/**
 * 扫描 stores 目录，创建 store
 * @returns {object} store
 */
export default (function() {
  const stores = {};
  context.keys().forEach(path => {
    let key = "";
    const pathItems = path.split("/").slice(1);
    if (pathItems[0] === "_model") return;

    const len = pathItems.length;
    pathItems.forEach((it, index) => {
      let item = it;
      if (index === len - 1) {
        item = item.slice(0, item.length - 3); // 移除 .js
      }
      if (!index) key += item;
      else key += item[0].toLocaleUpperCase() + item.slice(1);
    });

    stores[key] = context(path).default;
  });

  return stores;
})();
