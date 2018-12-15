import { get } from 'utils/request';
import Cache from 'utils/Cache';

export default class CategoryService extends Cache {
  async getCategory(params){
    const { cid, level } = params;
    
    if ( level !== undefined ) 
      return this.getCategoryByLevel(level);
    else if ( cid !== undefined ) 
      return this.getCategoryByCid(cid);
  }

  // 在 service 层将 getCategory 拆分成多个针对请求的微处理接口
  // 必要时使用缓存数据
  async getCategoryByLevel(level){
    let res = this.getCache('getCategoryByLevel', level);
    if ( res ) return res;
    
    res = await get('/api/category', { level });
    this.setCache('getCategoryByLevel', level, res);
    return res;
  }

  async getCategoryByCid(cid){
    let res = this.getCache('getCategoryByCid', cid);
    if ( res ) return res;

    res = await get('/api/category', { cid });
    this.setCache('getCategoryByCid', cid, res);
    return res;
  }
}