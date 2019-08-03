import { observable, action } from "mobx";
import * as ProductService from "services/product";

export default class Attribute {
  @observable attributes = [];

  @action
  async getAttributes(params) {
    const res = await ProductService.getAttributes(params);
    if (res && res.code === 200) this.attributes = res.data;

    return res;
  }
}
