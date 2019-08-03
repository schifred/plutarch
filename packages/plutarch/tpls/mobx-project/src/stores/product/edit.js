import { observable, action, computed } from "mobx";
import Product from "../_models/product/Product";

class ProductEditVM extends Product {
  @observable attributes = []; // 商品属性全量信息

  // 获取属性
  @action
  async getAttributes(cid) {
    this.attributes = [];
    const res = await this.attribute.getAttributes({ cid });
    if (res && res.code === 200) this.attributes = res.data;
    return res;
  }

  @action
  async getCategory(params) {
    const res = await this.category.getCategory(params);
    return res;
  }

  @action
  async getCategoryByLevels(cids) {
    const res = await this.category.getCategoryByLevels(cids);
    return res;
  }

  // 编辑页显示数据
  @computed
  get pageValues() {
    let attrValues = {};
    Object.keys(this.attrValues).forEach(attrId => {
      attrValues[`attrId${attrId}`] = this.attrValues[attrId];
      return attrId;
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

export default new ProductEditVM();
