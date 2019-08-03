const context = require.context("pages", true, /\.js$/);

/**
 * 扫描 stores 目录，创建 store
 * @returns {object} store
 */
export default (function() {
  const pages = {};
  context.keys().forEach(path => {
    if (path.match(/\/index.js$/)) {
      const pagePath = path.replace(/\/index.js$/, "").replace(/.\//, "");
      pages[pagePath] = context(path).default;
    }
  });

  return pages;
})();
