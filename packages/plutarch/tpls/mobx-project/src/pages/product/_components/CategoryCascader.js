import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Cascader } from 'antd';

@observer
export default class CategoryCascader extends Component{
  loadData = (selectedOptions) => {
    const { category } = this.props;
    category.getCategory({ level: selectedOptions.length + 1 });
  }

  render(){
    const { category, ...rest } = this.props;
    return <Cascader {...rest} loadData={this.loadData} changeOnSelect 
      options={category.categoriesTree} />;
  }
};