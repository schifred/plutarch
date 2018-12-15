import { observable, action, computed, transaction } from "mobx";
import Product from '../models/Product';

export default class ProductInEdit extends Product {
  @observable attributes = [];// 商品属性全量信息

  // 获取属性
  @action
  async getAttributes(cid){
    this.attributes = [];
    const res = await this.attribute.getAttributes({ cid  });
    if ( res ) this.attributes = res;
    return res;
  }

  // 编辑页显示数据
  @computed
  get pageValues(){
    let attrValues = {};
    Object.keys(this.attrValues).map(attrId => {
      attrValues[`attrId${attrId}`] = this.attrValues[attrId];
    });

    return {
      name: this.name,
      cids: this.cids,
      attrs: attrValues,
      num: this.num,
      price: this.price,
      desc: this.desc
    };
  }
}