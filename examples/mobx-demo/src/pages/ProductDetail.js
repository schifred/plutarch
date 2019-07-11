import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Collapse, Button } from 'antd';
import CategoryText from './components/CategoryText';
import { DetailUnits as Attributes } from './components/Attributes';
import $i18n from "utils/$i18n";

const { Panel } = Collapse;

@inject('productDetail', 'category')
@observer
export default class ProductDetail extends Component {
  componentDidMount(){
    const { productDetail: product, category, match: { params: { id } } } = this.props;
    product.getProduct(id).then(res => {
      if ( !res ) return;

      const { cids } = product;
      product.getCategories(cids);
      product.getAttributes(cids[cids.length - 1]);
    });
  }

  render(){
    console.log(123456781)
    const { productDetail: product } = this.props;
    
    return (
      <Collapse defaultActiveKey={['1']}>
        <Panel header={`${$i18n('text.product')}${$i18n('text.detail')} id:${product.id}`} key="1">
          <div style={{display: 'flex'}}>{$i18n('model.product.name')}：{product.name}</div>
          <div style={{display: 'flex'}}>{$i18n('model.product.categories')}：<CategoryText product={product} /></div>
          <div style={{display: 'flex'}}>{$i18n('model.product.attrs')}：<Attributes attributeTexts={product.attributeTexts} /></div>
          <div style={{display: 'flex'}}>{$i18n('model.product.price')}：{product.price}</div>
          <div style={{display: 'flex'}}>{$i18n('model.product.num')}：{product.num}</div>
          <div style={{display: 'flex'}}>{$i18n('model.product.desc')}：{product.desc}</div>

          <div>
            <Button style={{marginTop: '10px'}} type='primary'>
              <Link to='/products'>{$i18n('action.return')}{$i18n('text.list')}</Link>
            </Button>
            <Button style={{marginTop: '10px', marginLeft: '10px'}}>
              <Link to={`/edit/${product.id}`}>{$i18n('action.edit')}</Link>
            </Button>
          </div>
        </Panel>
      </Collapse>
    )
  }
}