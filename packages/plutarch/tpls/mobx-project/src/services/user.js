import { get } from "utils/request";

/**
 * 获取用户信息
 * @param {object} params
 */
export async function getUserInfo(params) {
  const res = await get("/getUserInfo", params);
  return res;
}

/**
 * 登录
 * @param {object} params
 */
export async function login(params) {
  const res = await get("/login", params);
  return res;
}

/**
 * 退出
 * @param {object} params
 */
export async function logout(params) {
  const res = await get("/logout", params);
  return res;
}
