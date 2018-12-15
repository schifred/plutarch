import { observable, action } from "mobx";
import Product from './detail';

// 直接与页面交互的 model
class ProductList {
  @observable products = [];
  
  @action
  async getProducts(){
    this.products = [];
    const res = await Product.query();
    (res || []).map(item => {
      this.products.push(new Product(item));
    });

    return res;
  }
};

export default new ProductList();