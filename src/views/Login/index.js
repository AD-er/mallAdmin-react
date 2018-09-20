import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Layout, Card, Form, Popover, Icon, Input, Button, Checkbox, message, notification } from 'antd';
import { LoginPage } from './style';
import { checkLogin, loginAuth } from '../../utils/Api';

const FormItem = Form.Item;

class Login extends Component {
	componentDidMount () {
    notification.open({
      message: '初始登录',
      duration: 10,
      description: (
      	<ul>
	        <li>账号：admin</li>
	        <li>密码：admin</li>
	      </ul>
      )
    })
  }

	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      	var data = {
			    username: values.userName,
			    password: values.password
			  }
				loginAuth(data).then((res) => {
					if (res && res.status === 201) {
						const {from} = this.props.location.state || {from: {pathname: '/'}};
						this.props.history.push(from);
				    notification.success({
				      message: '登录成功！',
				      description: (
				      	<ul>
					        <li>您好！{res.data.admin}</li>
					        <li>欢迎登陆后台管理系统！</li>
					      </ul>
				      )
				    })
					} else if (res) {
						message.error(res.data.msg);
					}
				});
      }
    });
  }

	render() {
		const { getFieldDecorator } = this.props.form;
		const { from } = this.props.location.state || { from: { pathname: "/" } };
		const text = <span>联系方式</span>;
		const content = (
		  <div>
		    <p>QQ: 719090793</p>
		    <p>Email: 719090793@qq.com</p>
		  </div>
		);

    if (checkLogin()) {
      return <Redirect to={from} />;
    }
    
		return (
			<Layout style={{minHeight: '100vh'}}>
				<Layout.Content>
					<LoginPage>
						<Card className="login-card" title="Mall Admin">
							<Form onSubmit={this.handleSubmit}>
				        <FormItem>
				          {getFieldDecorator('userName', {
				            rules: [{ required: true, message: '请填写您的手机号码 OR 电子邮箱!' }],
				          })(
				            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号码 OR 电子邮箱" />
				          )}
				        </FormItem>
				        <FormItem>
				          {getFieldDecorator('password', {
				            rules: [{ required: true, message: '请填写您的登录密码!' }],
				          })(
				            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="登录密码" />
				          )}
				        </FormItem>
				        <FormItem>
				          {getFieldDecorator('remember', {
				            valuePropName: 'checked',
				            initialValue: true,
				          })(
				            <Checkbox>记住密码</Checkbox>
				          )}
				          <a className="login-form-forgot" href="">忘记密码？</a>
				          <Button type="primary" htmlType="submit" style={{ width: '100%' }} size="large">
				            <Icon type="login" />登 录
				          </Button>
				        </FormItem>
				      </Form>
				      <Popover placement="bottomLeft" title={text} content={content} trigger="click">
		            <span style={{cursor: 'pointer'}}>联系管理员</span>
		          </Popover>
						</Card>
					</LoginPage>
				</Layout.Content>
				<Layout.Footer style={{ textAlign: 'center' }}>
				  Mall Admin ©2018 Design & Created by <Icon type="heart" style={{ color: '#e27575' }} /> AD
				</Layout.Footer>
			</Layout>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
  onLogin(data) {
    dispatch({
      type: 'INIT_LOGIN',
      data
    });
  }
});

export default connect(null, mapDispatchToProps)(Form.create()(Login));
