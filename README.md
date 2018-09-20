## 基于Laravel + React前后端完全分离的商城后台前端Demo[[在线预览](http://admin.dajing.ren)]
自己利用业余时间，基于Laravel + React前后端完全分离的商城后台前端Demo。主要熟悉前后端完全分离对接技术，基本已经实现商城大体框架，页面均简单完成后端数据交互。更多关联作品：
> * 基于Laravel + Bootstrap商城前后端Demo[[GitHub源码](https://github.com/AD-er/mall-laravel)]
> * 基于Laravel + Wepy微信小程序商城Demo[[GitHub源码](https://github.com/AD-er/mallWechat-wepy)]

### 依赖模块
| 模块 | 一句话描述 | 本作品应用场景 |
| -- | ----- | ------- |
| [antd](https://ant.design) | 一个UI设计语言 | 主要UI组件 |
| [axios](https://www.npmjs.com/package/axios) | 一个基于 promise 的 HTTP 库 | 创建 http 请求 |
| [react](https://reactjs.org) | 一个用于构建用户界面的 JavaScript 库 | 用于构建UI |
| [redux](https://redux.js.org) | 一个面向 JavaScript 应用的可预测状态容器 | 应用状态管理 |
| [react-router](https://reacttraining.com/react-router) | 一个基于 React 之上的强大路由库 | 构建单页应用 |
| [redux-thunk](https://www.npmjs.com/package/redux-thunk) | 一个Redux的中间件 | 处理异步请求 |
| [redux-immutable](https://www.npmjs.com/package/redux-immutable) | 一个与Redux组合转换器 | Redux 数据转换 |
| [styled-components](https://www.styled-components.com) | 一个常用的 css in js 类库 | 应用样式布局 |

### 安装使用
1). 克隆本作品源代码到本地：

     git clone git@github.com:AD-er/mallAdmin-react.git
    
2). 安装作品依赖模块

     npm install

3). 配置 package.json 文件

```
"proxy": {
    "/apia": {
      "target": "后端API接口",
      "changeOrigin": true
    }
  }
```

4). 启动应用

     npm start

### 最后