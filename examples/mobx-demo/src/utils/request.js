import axios from 'axios';
import { message as antdMessage } from 'antd';

// get 请求，通过 axios.request 发送实际请求
export async function get(url, params, opts){
  const res = await request('get', url, params, opts);
  return res;
};

// post 请求
export async function post(url, params, opts){
  const res = await request('post', url, params, opts);
  return res;
};

// delete 请求
export async function del(url, params, opts){
  const res = await request('delete', url, params, opts);
  return res;
};

// 获取响应，通过 catch 语句显示错误内容
function request(method, url, params, opts){
  return new Promise(async (resolve, reject) => {
    const res = await axios.request({
      method, 
      url, 
      params: ['get', 'delete'].indexOf(method) !== -1 ? params : undefined,
      data: ['post', 'put'].indexOf(method) !== -1 ? params : undefined, 
      timeout: 1000,
      opts
    }).catch(err => {
      showError(err);
    });

    if ( !res ) return;
    
    // service 获得数据为实际所需的数据
    const { data } = res;
    resolve(data);
  });
};

// 使用拦截器处理状态码及 code 值，在 axios - then/catch 回调前执行
axios.interceptors.response.use(res => {
  const { data, status, statusText, request } = res;
  const { responseURL: url } = request;

  // http 状态码
  if ( status != 200 ){
    return Promise.reject({
      code: status,
      messsage: statusText,
      url,
    });
  };
  
  const { code, message } = data;

  // 响应 code 值
  if ( code == 403 ){
    return Promise.reject({
      code,
      message: 'no permission',
      url,
    });
  } else if ( code != 200 ){
    return Promise.reject({
      code,
      message,
      url,
    });
  };

  return data;
}, err => {
  return Promise.reject(err);
});

// 显示错误。antd 特性：多个错误可以平铺展示
function showError(error){
  const { code, message, url } = error;
  antdMessage.error(message
    // <div>
    //   <div>{`url: ${url}`}</div>
    //   <div>{`code: ${code}`}</div>
    //   <div>{`message: ${message}`}</div>
    // </div>
  );
};