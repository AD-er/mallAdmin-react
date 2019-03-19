## 项目简介
一个基于Laravel + React前后端完全分离的商城后台Demo。主要熟悉前后端完全分离对接技术，基本已经实现商城大体框架，页面均简单完成前后端数据交互。更多关联项目：
> * 基于Laravel + Bootstrap商城前后端Demo[[GitHub源码](https://github.com/AD-er/mallWeb-bootstrap)]
> * 基于Laravel + Wepy微信小程序商城Demo[[GitHub源码](https://github.com/AD-er/mallWechat-wepy)]

### 前端依赖
| 模块 | 一句话描述 | 使用场景 |
| ---- | ---------- | -------- |
| [antd](https://github.com/ant-design/ant-design) | 一套企业级的 UI 设计语言 | 应用页面组件 |
| [axios](https://github.com/axios/axios) | 一个基于 promise 的 HTTP 库 | 创建数据请求 |
| [react](https://github.com/facebook/react) | 一个用于构建用户界面的 JavaScript 库 | 用于构建页面 |
| [redux](https://github.com/reduxjs/redux) | 一个面向 JavaScript 应用的可预测状态容器 | 应用状态管理 |
| [recharts](https://github.com/recharts/recharts) | 一个基于 React 和 D3 组合式的图表库 | 数据统计图表 |
| [react-router](https://github.com/ReactTraining/react-router) | 一个基于 React 之上的强大路由库 | 构建页面路由 |
| [redux-thunk](https://github.com/reduxjs/redux-thunk) | 一个 Redux 的中间件 | 处理异步请求 |
| [redux-immutable](https://github.com/gajus/redux-immutable) | 一个与 Redux 组合转换器 | 应用数据转换 |
| [styled-components](https://github.com/styled-components/styled-components) | 一个常用的 css in js 类库 | 页面样式布局 |

### 前端安装
1). 克隆本项目源代码到本地：

     git clone https://github.com/AD-er/mallAdmin-react.git
    
2). 切换至项目目录

     cd mallAdmin-react

3). 安装模块依赖

     npm install

4). 配置 package.json 文件

```
"proxy": {
    "/apia": {
      "target": "后端API接口",
      "changeOrigin": true
    }
  }
```

5). 启动应用

     npm start


### 截图预览
以下简单截图，预览后台大体结构布局：
> *更新中

### 后端API
API接口由另一个项目[[基于Laravel + Bootstrap商城前后端Demo](https://github.com/AD-er/mallWeb-bootstrap)]提供开发，使用Laravel框架、DingoAPI扩展、RESTFul 设计风格、JWT 身份验证、Transformer数据序列化等 API 开发相关技术。更多详情介绍请查看[GitHub源码](https://github.com/AD-er/mallWeb-bootstrap)

### 最后
本项目[作者](https://github.com/AD-er)本人利用业余时间，断断续续设计编码。结合已掌握和新知识，参考部份开源项目。部份功能尚未完善，做得不好，当做参考。欢迎指正~
