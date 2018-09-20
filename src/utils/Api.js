import axios from 'axios';
import { message } from 'antd';

/**
 * 普通请求
 * @param options      接口参数
 */
export const request = (options) => {
  if (typeof options === 'string') {
    options = {
      url: options
    }
  }
  // 拼接请求地址
  options.url = '/apia/' + options.url
  let response = axios.request(options).then(res => res).catch(err => { 
    console.log(err);
    message.error('接口异常！请联系管理员');
  });
  return response;
};

/**
 * 登录认证
 * @param params      接口参数
 */
export const loginAuth = (params) => {
  let response = request({
    url: 'authorizations',
    method: 'POST',
    data: params
  });

  response.then((res) => {
    if (res && res.status === 201) {
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('access_token_expired_at', new Date().getTime() + res.data.expires_in * 1000);
    }
  });

  return response;
};

/**
 * 刷新Token
 * @param accessToken      接口参数
 */
// export const refreshToken = async (accessToken) => {
//   const response = await request({
//     url: 'authorizations/current',
//     method: 'PUT',
//     headers: {
//       'Authorization': 'Bearer ' + accessToken
//     }
//   }).then((res) => {
//     // 刷新成功
//     if (res && res.status === 200) {
//       localStorage.setItem('access_token', res.data.access_token);
//       localStorage.setItem('access_token_expired_at', new Date().getTime() + res.data.expires_in * 1000);
//     }
//   });

//   return response;
// };

/**
 * 获取Token
 * @param params      接口参数
 */
export const getToken = async () => {
  let accessToken = localStorage.getItem('access_token');
  let expiredAt = localStorage.getItem('access_token_expired_at');

  // 如果 token 过期了，则调用刷新方法
  if (accessToken && new Date().getTime() > expiredAt) {
    // let refreshResponse = await refreshToken(accessToken);

    accessToken = await request({
      url: 'authorizations/current',
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then((res) => {
      // 刷新成功
      if (res && res.status === 200) {
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('access_token_expired_at', new Date().getTime() + res.data.expires_in * 1000);
        return res.data.access_token;
      } else {
        // localStorage.removeItem('access_token')
        // 刷新失败了，重新调用登录方法，设置 Token
      }
    });
  }

  return accessToken;
};

/**
 * 注销退出
 */
export const logoutAuth = async () => {
  let accessToken = await getToken();
  let response = request({
    url: 'authorizations/current',
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer '+accessToken
    }
  });

  response.then(res => {
    // 注销成功
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_expired_at');
  });

  return response;
};

/**
 * 带认证请求
 * @param options      接口参数
 */
export const authRequest = async (options) => {
  if (typeof options === 'string') {
    options = {
      url: options
    }
  }

  let accessToken = await getToken();
  options.headers = {
    'Authorization': 'Bearer '+accessToken
  }
  return request(options);
};

/**
 * 用户是否已经登录
 */
export const checkLogin = () => {
  let accessToken = localStorage.getItem('access_token');
  return (accessToken !== null && accessToken !== '');
};
