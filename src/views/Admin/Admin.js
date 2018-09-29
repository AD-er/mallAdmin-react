import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Avatar } from 'antd';
import { Info, List } from './style';
import { actionCreators } from './store';
import UpdateAvatar from './components/UpdateAvatar';
import UpdatePasswd from './components/UpdatePasswd';

class Admin extends Component {
  state = {
    updateAvatarVisible: false,
    updatePasswdVisible: false,
  }

	componentDidMount () {
	  this.props.getAdmin();
	}

  showUpdateAvatarModal = () => {
    this.setState({ updateAvatarVisible: true });
  }

  handleUpdateAvatarCancel = () => {
    this.setState({ updateAvatarVisible: false });
  }

  showUpdatePasswdModal = () => {
    this.setState({ updatePasswdVisible: true });
  }

  handleUpdatePasswdCancel = () => {
    this.setState({ updatePasswdVisible: false });
  }

	render() {
    const { admin } = this.props;

		return <Fragment>
      <Card title="个人中心">
        <div style={{display: 'flex'}}>
          <div style={{width: '160px'}}>
            <Avatar shape="square" size={140} icon="user" />
          </div>
          <Info>
            <li><b>用户名：</b> {admin.name}</li>
            <li><b>更新时间：</b> {admin.updated_at}</li>
            <li><b>注册时间：</b> {admin.created_at}</li>
            <li><span onClick={this.showUpdateAvatarModal}>更换头像</span></li>
          </Info>
        </div>
        <List>
          <li>
            <div className="set-list-left">
              <b>登录密码</b>
            </div>
            <div className="set-list-right">
              <span onClick={this.showUpdatePasswdModal}>修改</span>
            </div>
            <div className="set-list-mid">
              安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。
            </div>
          </li>
          <li>
            <div className="set-list-left">
              <b>手机号码</b>
            </div>
            <div className="set-list-right">
              { admin.phone ? <span onClick={this.showUpdatePasswdModal}>修改</span> : <span>去设置</span> }
            </div>
            <div className="set-list-mid">
              {
                admin.phone
                ? '您已绑定了手机' + admin.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
                : '请绑定一个手机号码'
              } [您的手机为安全手机，可用于账户登录或找回密码]
            </div>
          </li>
          <li>
            <div className="set-list-left">
              <b>电子邮箱</b>
            </div>
            <div className="set-list-right">
              { admin.email !== '未设置' ? <span>修改</span> : <span>去设置</span> }
            </div>
            <div className="set-list-mid">
              {
                admin.email !== '未设置'
                ? '您已绑定了邮箱' + admin.email
                : '请绑定一个电子邮箱'
              } [您的邮箱为安全邮箱，可用于账户登录或找回密码]
            </div>
          </li>
          <li>
            <div className="set-list-left">
              <b>注销账号</b>
            </div>
            <div className="set-list-right">
              <span>注销账号</span>
            </div>
            <div className="set-list-mid">
              如果您不再使用此账号，可以将其注销。账号成功注销后，其下所有服务、数据及隐私信息将会被删除并将无法恢复。
            </div>
          </li>
        </List>
      </Card>
      <UpdateAvatar
        visible={this.state.updateAvatarVisible}
        onCancel={this.handleUpdateAvatarCancel}
      />
      <UpdatePasswd
        wrappedComponentRef={this.saveFormRef}
        visible={this.state.updatePasswdVisible}
        onCancel={this.handleUpdatePasswdCancel}
        onCreate={this.handleUpdatePasswdCreate}
      />
    </Fragment>
	}
}

const mapStateToProps = (state) => ({
  admin: state.getIn(['admin', 'admin']),
});

const mapDispatchToProps = (dispatch) => ({
  getAdmin () {
    dispatch(actionCreators.getAdmin());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);