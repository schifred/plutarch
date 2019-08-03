import { Component } from "react";
import { observer } from "mobx-react";

// 远程获取的数组项数据需要重新设置观察者，以驱动视图更新
@observer
export default class CategoryText extends Component{
  componentDidMount(){
    const { product, loadCategory } = this.props;
    if ( loadCategory ) product.category.getCategoryByCids(product.cids.toJS());
  }

  render(){
    const { product } = this.props;
    return product.category.categoryTexts;
  }
};