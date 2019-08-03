import axios from "axios";
import { message as antdMessage } from "antd";
import configs from "configs";

// get 请求，通过 axios.request 发送实际请求
export async function get(url, params, opts) {
  const res = await request("get", url, params, opts);
  return res;
}

// post 请求
export async function post(url, params, opts) {
  const res = await request("post", url, params, opts);
  return res;
}

// put 请求
export async function put(url, params, opts) {
  const res = await request("put", url, params, opts);
  return res;
}

// delete 请求
export async function del(url, params, opts) {
  const res = await request("delete", url, params, opts);
  return res;
}

// 获取响应，通过 catch 语句显示错误内容
function request(method, url, params, opts) {
  return axios
    .request({
      method,
      url: configs.UrlPrefix ? `${configs.UrlPrefix}${url}` : url,
      params: ["get", "delete"].indexOf(method) !== -1 ? params : undefined,
      data: ["post", "put"].indexOf(method) !== -1 ? params : undefined,
      timeout: 1000,
      ...opts
    })
    .catch(err => {
      showError(err);
    });
}

// 使用拦截器处理状态码及 code 值，在 axios - then/catch 回调前执行
axios.interceptors.response.use(interceptor, err => Promise.reject(err));

/**
 * 拦截器
 * @param {object} res 原始响应
 */
function interceptor(res) {
  const {
    data,
    status,
    statusText,
    config: { disableErrorShower }
  } = res;

  // http 状态码
  if (status !== 200) {
    return Promise.reject(new Error(statusText));
  }

  const { code, message } = data;

  // 响应 code 值
  if (code === 403) {
    return Promise.reject(new Error("no permission"));
  } else if (code !== 200 && !disableErrorShower) {
    return Promise.reject(new Error(message));
  }

  return data;
}

/**
 * 显示错误。antd 特性：多个错误可以平铺展示
 * @param {object} error 错误
 */
function showError(error) {
  const { message } = error;
  antdMessage.error(message);
}
