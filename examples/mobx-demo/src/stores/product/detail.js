import { observable, action, computed, transaction } from "mobx";
import Product from '../models/Product';

const StatusList = [{
  text: '下架', value: 'offline'
}, {
  text: '上架', value: 'online'
}];

export default class ProductInDetail extends Product {
  @observable categories = [];// 商品分类全量信息
  @observable attributes = [];// 商品属性全量信息

  // 备注，改变单个数组项的属性不会引起视图重绘，必须在数组中改变整个数组项
  // 在 product 实例初始化过程中调用 getCategories 方法，不会引起 Table 视图的重绘
  @action
  async getCategories(cids){
    this.categories = [];
    const res = await this.category.getCategoryByCids(cids);
    if ( res ) this.categories = res;
    return res;
  }

  // 获取商品分类文案
  @computed
  get categoryTexts(){
    return this.categories.map(item => item.name).join(', ');
  }

  // 获取属性
  @action
  async getAttributes(cid){
    this.attributes = [];
    const res = await this.attribute.getAttributes({ cid  });
    if ( res ) this.attributes = res;
    return res;
  }

  @computed
  get attributeTexts(){
    const { attrValues, attributes } = this;
    if ( !Object.keys(attrValues).length || !attributes.length ) return [];

    let result = [];

    Object.keys(attrValues).map(key => {
      const attr = attributes.find(attr => attr.id == key);
      const name = attr.name;
      let value = attrValues[key].map(val => {
        return attr.options.find(item => item.id == val).name;
      });

      result.push({
        name,
        value
      });
    });

    return result;
  }

  // 获取商品状态文案
  @computed
  get statusText(){
    let text = StatusList.filter(item => item.value === this.status)[0].text;

    return text;
  }
}