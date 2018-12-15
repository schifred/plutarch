import React, { Component } from "react";
import { observer } from "mobx-react";
import { Form, Select, Button } from 'antd';
import $i18n from "utils/$i18n";

const FormItem = Form.Item;
const Option = Select.Option;

@observer
export default class EditUnits extends Component {

  render(){
    const { attributes, formItemLayout, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        {
          attributes.map(attr => {
            return (
              <FormItem {...formItemLayout} label={attr.name} key={attr.id}>
                {getFieldDecorator(`attrs.attrId${attr.id}`, {
                  rules: [{ required: true, message: `${$i18n('text.please_select')}${attr.name}！` }],
                })(
                  <Select mode="multiple" placeholder={`${$i18n('text.please_select')}${attr.name}！`}>
                    {
                      attr.options.map(item => {
                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            )
          })
        }
      </div>
    );
  }
};