import Attribute from "./models/Attribute";
import Category from "./models/Category";
import Product from "./models/Product";
import ProductInDetail from "./product/detail";
import ProductInEdit from "./product/edit";
import productList from "./product/list";

export default {
  'attribute': new Attribute(),
  'category': new Category(),
  'productDetail': new ProductInDetail(),
  'productEdit': new ProductInEdit(),
  'product': new Product(),
  'productList': productList
}