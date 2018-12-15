import { observable, action } from "mobx";
import AttributeService from 'services/attribute';

export default class Attribute extends AttributeService {
  @observable attributes = [];

  @action
  async getAttributes(params){
    const res = await super.getAttributes(params);
    if ( res ) this.attributes = res;
    
    return res;
  }
}
