import { observable, action } from "mobx";
import * as ProductService from "services/product";
import Product from "../_models/product/Product";

// 直接与页面交互的 model
class ProductList {
  @observable products = [];

  @action
  async getProducts() {
    this.products = [];
    const res = await ProductService.queryProduct();
    if (res && res.code === 200) {
      this.products = res.data.map(item => new Product(item));
    }

    return res;
  }
}

export default new ProductList();
