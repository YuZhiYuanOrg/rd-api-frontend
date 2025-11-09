// src/app.ts
import { message } from 'antd';

// 配置请求拦截器和响应拦截器
export const request = {
  // 1. 请求拦截器：发送请求前的处理（拼接前缀、加Token、设置请求头）
  requestInterceptors: [
    (config) => {
      // 拼接接口基础前缀（和后端约定的 api/v1 ）
      config.baseURL = `http://localhost:3000`;

      // 设置请求头为JSON格式（后端需支持）
      config.headers['Content-Type'] = 'application/json';

      // 允许跨域请求携带Cookie（如果后端需要，比如登录态）
      config.withCredentials = true;

      return config;
    },
  ],

  // 2. 响应拦截器：接收响应后的统一处理（错误提示、Token过期处理）
  responseInterceptors: [
    (response) => {
      const { data } = response;
      // 后端返回 success: false 时，统一提示错误信息
      if (!data.success) {
        message.error(data.errorMessage || '接口请求失败');
      }
      // Token过期处理（如果后端返回特定错误码，比如 401）
      if (response.status === 401) {
        message.error('登录已过期，请重新登录');
        // 跳转到登录页（如果有登录页）
        window.location.href = '/login';
      }
      return response;
    },
  ],
};
