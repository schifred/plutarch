import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Collapse, Form, Input, Button } from 'antd';
import CategoryCascader from './components/CategoryCascader';
import { EditUnits as Attributes } from './components/Attributes';
import $i18n from "utils/$i18n";

const { Panel } = Collapse;
const FormItem = Form.Item;

const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 8 } };
const tailFormItemLayout = { wrapperCol: { span: 8, offset: 4 } };

@inject('productEdit', 'category')
@observer
class CreateProduct extends Component {
  componentDidMount(){
    const { productEdit: product, category, form, match: { params: { id } } } = this.props;

    if ( id )
      product.getProduct(id).then(res => {
        if ( !res ) return;
        const { cids } = product;

        Promise.all([
          category.getCategoryByLevels(cids),
          product.getAttributes(cids[cids.length - 1])
        ]).then(res => {
          if ( !res ) return;
          form.setFieldsValue(product.pageValues);
        })
      })
    else
      category.getCategory({ level: 1 });
  }

  // 分类属性变更
  handleCategoryChange = cids => {
    const { productEdit: product } = this.props;
    if ( cids.length == 2 ) product.getAttributes(cids[cids.length - 1]);
  }

  // 提交数据
  onSubmit = () => {
    const { productEdit: product, form, match: { params: { id } } } = this.props;

    form.validateFields((errs, vals) => {
      if ( errs ) return;

      let attrValues = {};
      const { attrs, ...rest } = vals;
      Object.keys(attrs).map(key => {
        attrValues[key.slice(6)] = attrs[key];
      });

      // 将数据存入 store，准备提交
      product.setValues({
        ...rest,
        attrValues: attrValues
      });

      product.saveProduct();
    })
  }

  render(){
    const { productEdit: product, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Collapse defaultActiveKey={['1']}>
        <Panel header={product.id ? `${$i18n('action.edit')}${$i18n('text.product')} id:${product.id}` 
          : `${$i18n('action.edit')}${$i18n('text.product')}`} key="1">
          <Form>
            <FormItem {...formItemLayout} label={$i18n('model.product.name')}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: `${$i18n('text.please_input')}${$i18n('model.product.name')}` }],
              })(
                <Input placeholder={`${$i18n('text.please_input')}${$i18n('model.product.name')}`} />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={$i18n('model.product.categories')}>
              {getFieldDecorator('cids', {
                rules: [{ required: true, message: `${$i18n('text.please_input')}${$i18n('model.product.categories')}` }],
              })(
                <CategoryCascader placeholder={`${$i18n('text.please_input')}${$i18n('model.product.categories')}`} onChange={this.handleCategoryChange} />
              )}
            </FormItem>

            <Attributes attributes={product.attributes} formItemLayout={formItemLayout} form={form} />

            <FormItem {...formItemLayout} label={$i18n('model.product.price')}>
              {getFieldDecorator('price', {
                rules: [{ 
                  required: true, message: `${$i18n('text.please_input')}${$i18n('model.product.price')}`
                }, { 
                  pattern: /^([1-9](\d+)?|0)(\.\d{1,2})?$/, message: $i18n('text.should_be_two_decimals')
                }],
              })(
                <Input placeholder={`${$i18n('text.please_input')}${$i18n('model.product.price')}`} />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={$i18n('model.product.num')}>
              {getFieldDecorator('num', {
                rules: [{ 
                  required: true, message: `${$i18n('text.please_input')}${$i18n('model.product.num')}` 
                }, { 
                  pattern: /^[1-9](\d+)?|0$/, message: $i18n('text.should_be_integer')
                }],
              })(
                <Input placeholder={`${$i18n('text.please_input')}${$i18n('model.product.num')}`} />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={$i18n('model.product.desc')}>
              {getFieldDecorator('desc', {
                rules: [{ required: true, message: `${$i18n('text.please_input')}${$i18n('model.product.desc')}` }],
              })(
                <Input type='textarea' placeholder={`${$i18n('text.please_input')}${$i18n('model.product.desc')}`} />
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
                {$i18n('action.submit')}
              </Button>
            </FormItem>
          </Form>
        </Panel>
      </Collapse>
    );
  }
};

export default Form.create()(CreateProduct)