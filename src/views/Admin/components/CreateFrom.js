import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

const CreateForm = Form.create()(
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
          title="新增管理员账号"
          okText="提交"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <FormItem
            {...formItemLayout}
            label="用户名"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '必须输入账号用户名！',
                whitespace: true
              }],
            })(
              <Input placeholder="请输入账号用户名" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机号码"
          >
            {getFieldDecorator('phone', {
              rules: [{
                required: true,
                message: '必须输入账号联系号码！'
              },{
                pattern: /^1[3|4|5|8][0-9]\d{4,8}$/,
                message: '必须输入有效的手机号码！'
              }],
            })(
              <Input placeholder="请输入账号联系号码" style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="登录密码"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: '必须输入账号登录密码！',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" placeholder="请输入账号登录密码" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
          >
            {getFieldDecorator('password_confirmation', {
              rules: [{
                required: true,
                message: '必须再次输入账号登录密码！',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" placeholder="请输入账号登录密码" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
        </Modal>
      );
    }
  }
);

export default CreateForm;
