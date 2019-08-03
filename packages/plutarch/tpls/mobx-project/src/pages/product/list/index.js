import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import CategoryText from '../_components/CategoryText';
import { Table, Button, Popconfirm, message } from 'antd';
import $i18n from "utils/$i18n";

@inject('productList')
@observer
export default class ProductList extends Component {
  columns = [{
    title: $i18n('model.product.id'),
    dataIndex: 'id',
    key: 'id'
  }, {
    title: $i18n('model.product.name'),
    dataIndex: 'name',
    key: 'name',
  }, {
    title: $i18n('model.product.categories'),
    dataIndex: 'categories',
    key: 'categories',
    render: (categories, product) => {
      return <CategoryText loadCategory={true} product={product} />
    }
  }, {
    title: $i18n('model.product.price'),
    dataIndex: 'price',
    key: 'price'
  }, {
    title: $i18n('model.product.num'),
    dataIndex: 'num',
    key: 'num'
  }, {
    title: $i18n('model.product.status'),
    dataIndex: 'statusText',
    key: 'statusText'
  }, {
    title: $i18n('model.product.desc'),
    dataIndex: 'desc',
    key: 'desc'
  }, {
    title: $i18n('action.handle'),
    key: 'action',
    render: (text, product, index) => (
      <span>
        <Link to={`/app/products/detail/${product.id}`} style={{marginRight: '10px'}}>
          {$i18n('text.detail')}
        </Link>
        <Link to={`/app/products/edit/${product.id}`} style={{marginRight: '10px'}}>
          {$i18n('action.edit')}
        </Link>
        <Popconfirm title={$i18n('text.product.delete_confirm')} 
          onConfirm={() => { this.deleteProduct(product, index) }} 
          okText={$i18n('action.ok')} cancelText={$i18n('action.cancel')}>
          <a href="javascript:;">{$i18n('action.delete')}</a>
        </Popconfirm>
      </span>
    ),
  }];

  componentDidMount(){
    this.props.productList.getProducts();
  }

  // 删除商品
  deleteProduct = async (product, index) => {
    const { products } = this.props.productList;
    const res = await product.deleteProduct();
    if ( res && res.code === 200 ){
      products.splice(index);
      message.success($i18n('text.product.delete_success'));
    };
  }

  render(){
    const { products } = this.props.productList;
    
    return (
      <div style={{padding: "20px"}}>
        <Button style={{marginBottom: '15px'}} type='primary'>
          <Link to={'/app/products/create'}>
            {`${$i18n('action.create')}${$i18n('text.product')}`}
          </Link>
        </Button>
        <Table size="small" rowKey='id' columns={this.columns} dataSource={products.toJS()} />
      </div>
    );
  }
};
