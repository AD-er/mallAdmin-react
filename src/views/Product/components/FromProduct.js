import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

const ProductCreateForm = Form.create()(
  class extends React.Component {
    validateToArray = (rule, value, callback) => {
      if (value) {
        var items = value.split("\n");
        for (var i = 0; i < items.length; i++) {
          var reg = /^[\d]+(,|，)(\d{1,3}|\d{1,3}\.\d{1,2})$/;
          if (!reg.test(items[i])) {
            callback('第'+(i+1)+'行 '+items[i]+' 输入的格式不正确！价格不得超过3位数，小数保留2位');
          }
        }
      }
      callback();
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="新增 OR 修改"
          okText="提交"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem>
              {getFieldDecorator('description', {
                rules: [{
                  required: true,
                  message: '请输入商品ID和价格!'
                },{
                  pattern: /^[\d,，.\n]+$/,
                  message: '含有非法字符串！'
                }, {
                  validator: this.validateToArray,
                }],
              })(
                <Input.TextArea type="textarea" rows={5} placeholder="例：245641,20.99" />
              )}
            </FormItem>
          </Form>
          <span>注：请正确输入格式，多商品请换行。不存在就新增，存在则修改</span>
        </Modal>
      );
    }
  }
);

export default ProductCreateForm;
