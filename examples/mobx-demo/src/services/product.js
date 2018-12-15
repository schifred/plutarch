import { get, post, del } from 'utils/request';

export default class ProductService {
  // service 中校验必传参数，可以在本地模式中解决掉参数遗漏的问题
  async get({ id }){
    const res = await get('/api/product', { id });
    return res;
  }

  async query(){
    const res = await get('/api/products');
    return res;
  }

  async save(params){
    const res = await post('/api/product', params);
    return res;
  }

  async update({ id, ...params }){
    const res = await post('/api/product', { id, ...params });
    return res;
  }

  async del({ id }){
    const res = await del('/api/product', { id });
    return res;
  }
}