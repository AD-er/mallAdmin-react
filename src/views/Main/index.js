import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, Breadcrumb, Badge, Avatar, Icon, Modal } from 'antd';
import { Logo, Header } from './style';
import { actionCreators } from './store';
import Menus from './components/Menu';
import Content from './components/Content';
import { logoutAuth } from '../../utils/Api';

const menus = [
  {
    title: '首页',
    icon: 'home',
    path: '/home'
  },
  {
    title: '订单管理',
    icon: 'laptop',
    path: '/order',
    subs: [
      {path: '/order?filter=all', title: '所有订单', icon: ''},
      {path: '/order?filter=pay', title: '待付款', icon: ''},
      {path: '/order?filter=send', title: '待发货', icon: ''},
      {path: '/order?filter=arrive', title: '待收货', icon: ''},
      {path: '/order?filter=after', title: '售后', icon: ''},
    ]
  },
  {
    title: '商品管理',
    icon: 'bars',
    path: '/product',
    subs: [
      {path: '/product/profit', title: '利润控制', icon: ''},
    ]
  },
  {
    title: '会员管理',
    icon: 'team',
    path: '/user',
    subs: [
      {path: '/user/user', title: '所有会员', icon: ''},
      {path: '/user/visitor', title: '访客记录', icon: ''},
    ]
  },
  {
    title: '后台管理',
    icon: 'desktop',
    path: '/admin',
    subs: [
      {path: '/admin/user', title: '管理员', icon: ''},
      {path: '/admin/role', title: '角色', icon: ''},
      {path: '/admin/permission', title: '权限', icon: ''},
    ]
  },
  {
    title: '微信管理',
    icon: 'bulb',
    path: '/wechat',
    subs:[
      {path: '/wechat/public', title: '公众号', icon: ''},
      {path: '/wechat/mini', title: '小程序', icon: ''},
    ]
  },
  {
    title: '关于',
    icon: 'info-circle-o',
    path: '/about'
  }
]


class Main extends Component {
  componentDidMount () {
    const bodyWidth = document.querySelector('body').offsetWidth;
    this.props.getCurrentAdmin();
    if (bodyWidth <= 1600) {
      this.props.onToggle();
    }
  }

  renderSubMenu = (pathname) => {
    let route = [];
    for (var i = 2; i <= pathname.length; i++) {
      route = [...route, pathname.slice(0, i).join('/')]
    }
    return this.renderBreadcrumb(menus, route, [])
  }

  renderBreadcrumb = (menu, route, bc) => {
    for (var i = 0; i < menu.length; i++) {
      if (route.indexOf(menu[i].path) > -1) {
        bc.push(menu[i].title)
        if (menu[i].subs && bc.length < route.length) {
          this.renderBreadcrumb(menu[i].subs, route, bc)
        }
      }
    }
    return bc
  }

  render() {
    const { collapsed, admin, onToggle, onLogout, history, location } = this.props;
    const breadcrumb = this.renderSubMenu(location.pathname.split('/'));
    const menu = (
      <Menu style={{ margin: '-4px -15px 0', borderRadius: '0 0 4px 4px' }}>
        <Menu.Item key="0">
          <Link to={"/admin/user/"+admin.id}><Icon type="user" /> 个人中心</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" onClick={() => onLogout(history)}><Icon type="logout" />注销退出</Menu.Item>
      </Menu>
    );

    return (
      <Layout style={{minHeight: '100vh'}}>
      	<Layout.Sider
	      	trigger={null}
      		collapsible
      		collapsed={ collapsed }
      	>
      		<Logo>
      			<h1>{ !collapsed ? "Mall Admin" : "Ma" }</h1>
      		</Logo>
      		<Menus menus={menus}/>
      	</Layout.Sider>
      	<Layout>
          <Header>
            <Icon
            	className="trigger"
              type={ collapsed ? 'menu-unfold' : 'menu-fold' }
              onClick={ onToggle }
            />
            <Breadcrumb style={{marginLeft: 8, display: 'inline'}}>
              <Breadcrumb.Item><Link to='/home'>首页</Link></Breadcrumb.Item>
              {breadcrumb.map(item=>{
                if (item !== '首页'){
                  return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                }
              })}
            </Breadcrumb>
            <ul className="right-menu">
              <li>
                <Badge count={0} dot>
                  <Icon type="notification" />
                </Badge>
              </li>
              <li>
                <Dropdown overlay={menu} trigger={['click']}>
                  <div>
                    {
                      admin.avatar
                      ? <Avatar className="avatar" src={admin.avatar} />
                      : <Avatar className="avatar" icon="user" />
                    }
                    {admin.name}
                    <Icon type="down" />
                  </div>
                </Dropdown>
              </li>
              
            </ul>
          </Header>
          <Content/>
          <Layout.Footer style={{ textAlign: 'center' }}>
            Mall Admin ©2018 Design & Created by <Icon type="heart" style={{ color: '#e27575' }} /> AD
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  collapsed: state.getIn(['main', 'collapsed']),
  admin: state.getIn(['main', 'admin'])
});

const mapDispatchToProps = (dispatch) => ({
  onToggle() {
    dispatch({
      type: 'ONCLICK_COLLAPSED'
    });
  },
  getCurrentAdmin () {
    dispatch(actionCreators.getCurrentAdmin());
  },
  onLogout(history) {
    Modal.confirm({
      title: '确认要注销退出系统吗？',
      content: (
        <ul>
          <li>请记住你的登录密码。</li>
        </ul>
      ),
      okText: '注销',
      cancelText: '取消',
      onOk() {
        logoutAuth().then(res => {
          if (res) {
            history.push('/login');
          }
        });
      }
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
