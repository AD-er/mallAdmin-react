import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

const UpdatePasswd = Form.create()(
  class extends React.Component {
    state = {
      confirmDirty: false,
    };

    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('两次输入密码不一致！');
      } else {
        callback();
      }
    }

    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['password_confirmation'], { force: true });
      }
      callback();
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        }
      }
      return (
        <Modal
          visible={visible}
          title="修改登录密码"
          okText="提交"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <FormItem
            {...formItemLayout}
            label="旧登录密码"
          >
            {getFieldDecorator('old_password', {
              rules: [{
                required: true,
                message: '必须输入账号旧登录密码！'
              }],
            })(
              <Input type="password" placeholder="请输入账号旧登录密码" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="新登录密码"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: '必须输入账号新登录密码！',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" placeholder="请输入账号新登录密码" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认新密码"
          >
            {getFieldDecorator('password_confirmation', {
              rules: [{
                required: true,
                message: '必须再次输入账号新登录密码！',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" placeholder="请输入账号新登录密码" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
        </Modal>
      );
    }
  }
);

export default UpdatePasswd;
