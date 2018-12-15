import { get } from 'utils/request';

export default class AttributesService {
  async getAttributes(params){
    const res = await get(`/api/attributes`, params);
    return res;
  }
}