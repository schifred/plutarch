import { get, post, put, del } from "utils/request";
import * as CacheUtils from "utils/cache";

/**
 * 获取产品详情
 * @param {object} params
 */
export async function getProduct(params) {
  const res = await get("/product", params);
  return res;
}

/**
 * 获取产品详情
 * @param {object} params
 */
export async function queryProduct(params) {
  const res = await get("/products", params);
  return res;
}

/**
 * 创建产品
 * @param {object} params
 */
export async function createProduct(params) {
  const res = await post("/product", params);
  return res;
}

/**
 * 更新产品
 * @param {object} params
 */
export async function updateProduct(params) {
  const res = await put("/product", params);
  return res;
}

/**
 * 删除产品
 * @param {object} params
 */
export async function deleteProduct(params) {
  const res = await del("/product", params);
  return res;
}

/**
 * 获取属性
 * @param {object} params
 */
export async function getAttributes(params) {
  const res = await get("/attributes", params);
  return res;
}

/**
 * 获取分类
 * @param {object} params
 */
export async function getCategory(params) {
  if ("level" in params) return getCategoryByLevel(params.level);
  else if ("cid" in params) return getCategoryByCid(params.cid);
}

/**
 * 获取分类；拆分接口，并缓存数据
 * @param {number} level 层级
 */
export async function getCategoryByLevel(level) {
  let res = CacheUtils.get("getCategoryByLevel", level);
  if (res) return res;

  res = await get("/category", { level });
  CacheUtils.set("getCategoryByLevel", level, res);
  return res;
}

/**
 * 获取分类；拆分接口，并缓存数据
 * @param {number} cid 分类 id
 */
export async function getCategoryByCid(cid) {
  let res = CacheUtils.get("getCategoryByCid", cid);
  if (res) return res;

  res = await get("/category", { cid });
  CacheUtils.set("getCategoryByCid", cid, res);
  return res;
}
