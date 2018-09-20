import React from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

const LoadableComponent = (component) => {
  return Loadable({
    loader: component,
    loading: ()=><Spin tip="Loading..." size="large"/>
  })
}

export default LoadableComponent