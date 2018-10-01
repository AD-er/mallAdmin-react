import React from 'react';
import { Layout } from 'antd';
import { Switch, Redirect } from 'react-router-dom';
import LoadableComponent from '../../../utils/LoadableComponent';
import PrivateRoute from '../../../route/PrivateRoute';


//参数一定要是函数，否则不会懒加载，只会代码拆分
const Home = LoadableComponent(()=>import('../../../views/Home'))

//订单管理
const Order = LoadableComponent(()=>import('../../../views/Order'))

//商品管理
const Product = LoadableComponent(()=>import('../../../views/Product'))

//会员管理
const User = LoadableComponent(()=>import('../../../views/User'))
const Visitor = LoadableComponent(()=>import('../../../views/User/Visitor'))

//后台管理
const Admins = LoadableComponent(()=>import('../../../views/Admin'))
const Admin = LoadableComponent(()=>import('../../../views/Admin/Admin'))

//微信
const Wechat = LoadableComponent(()=>import('../../../views/Wechat'))

//关于
const About = LoadableComponent(()=>import('../../../views/About'))

//404
const E_404 = LoadableComponent(()=>import('../../../views/Error/404'))

class ContentMain extends React.Component {
  render () {
    return (
      <Layout.Content style={{ margin: '16px 16px 0' }}>
        <Switch>
          <PrivateRoute exact path='/home' component={Home}/>

          <PrivateRoute exact path='/order' component={Order}/>

          <PrivateRoute exact path='/product/profit' component={Product}/>

          <PrivateRoute exact path='/user/user' component={User}/>
          <PrivateRoute exact path='/user/visitor' component={Visitor}/>

          <PrivateRoute exact path='/admin/user' component={Admins}/>
          <PrivateRoute exact path='/admin/user/:id' component={Admin}/>

          <PrivateRoute exact path='/wechat' component={Wechat}/>

          <PrivateRoute exact path='/about' component={About}/>

          <Redirect exact from='/' to='/home'/>

          <PrivateRoute exact path='/*' component={E_404}/>
        </Switch>
      </Layout.Content>
    )
  }
}

export default ContentMain