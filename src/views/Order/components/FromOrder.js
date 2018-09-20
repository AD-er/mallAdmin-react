import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, Modal  } from 'antd';

const FormItem = Form.Item;

class FromOrder extends Component {
  state = { visible: false }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: '请确认信息',
          content: this.props.label + '：' + values.select + '单号' + values.no,
          okText: '确认',
          cancelText: '取消',
          onOk() {
            console.log('Received values of form: ', values);
          }
        });
      }
    });
  }

  checkSelect = (rule, value, callback) => {
    if (this.props.select.indexOf(value) !== -1) {
      callback();
      return;
    }
    callback('参数不正确！');
  }

  checkNo = (rule, value, callback) => {
    console.log(value)
    if (value !== "") {
      callback();
      return;
    }
    callback('参数不正确！');
  }

	render() {
    const { label, select } = this.props;
    const { getFieldDecorator } = this.props.form;

		return <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem label={label}>
              <Fragment>
              {getFieldDecorator('select', {
                initialValue: select[0],
                rules: [{ validator: this.checkSelect }],
              })(
                <Select
                  style={{ width: '32%', marginRight: '3%' }}
                >
                {
                  select.map((item, index) => {
                    return <Select.Option key={index} value={item}>{item}</Select.Option>
                  })
                }
                </Select>
              )}
              </Fragment>
              <Fragment>
              {getFieldDecorator('no', {
                rules: [{ required: true, message: '请填写您的手机号码 OR 电子邮箱!' }, { validator: this.checkNo }],
              })(
                <Input
                  type="text"
                  placeholder="请输入订单号"
                  style={{ width: '65%' }}
                />
              )}
              </Fragment>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">提交</Button>
            </FormItem>
          </Form>
	}
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(FromOrder));