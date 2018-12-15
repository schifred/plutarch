import { observable, action, computed } from "mobx";
import ProductService from 'services/product';
import Category from './Category';
import Attribute from './Attribute';
import { mixin, mixinLocale, mixinStaticProperty } from 'utils/decorator';

// @mixinLocale('model.product')
// 可采用继承的方式将远程请求方法混入到 Product 类中，此处使用 mixinStaticProperty 装饰器混入静态方法
@mixinStaticProperty(ProductService)
export default class Product {
  category = new Category();
  attribute = new Attribute();

  @observable id;// 商品id
  @observable name;// 商品名称
  @observable cids;// 商品分类
  @observable attrValues = {};// 商品属性
  @observable num;// 库存
  @observable price;// 价格
  @observable desc;// 描述
  @observable status;// 状态

  constructor(props){
    // super(props);
    this.setValues(props);
  }

  // 设置主键
  @action
  setId(id){
    this.id = id;
  }

  // 后台交互数据全量更新；部分更新可直接使用赋值语句；重置可传空
  @action
  setValues(data = {}){
    this.id = data.id;
    this.name = data.name;
    this.cids = data.cids;
    this.attrValues = data.attrValues || {};
    this.num = data.num;
    this.price = data.price;
    this.desc = data.desc;
    this.status = data.status;
  }

  // 获取后台交互数据
  getValues(){
    return {
      id: this.id,
      name: this.name,
      cids: this.cids,
      attrValues: this.attrValues,
      num: this.num,
      price: this.price,
      desc: this.desc,
      status: this.status
    };
  }
  
  @action
  async getProduct(id){
    const res = await Product.get({ id });
    if ( res ) this.setValues(res);
    return res || null;
  }
  
  // @action
  // async createProduct(){
  //   const params = this.getValues();
  //   const res = await Product.save(params);
  //   return res;
  // }
  
  // @action
  // async updateProduct(){
  //   const params = this.getValues();
  //   const res = await Product.update(params);
  //   return res;
  // }
  
  @action
  async saveProduct(){
    const params = this.getValues();
    const res = params.id ? await Product.update(params) : await Product.save(params);
    return res;
  }
  
  @action
  async deleteProduct(){
    const res = await Product.del({ id: this.id });
    return res;
  }

}
