import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '更新管理',
      path: '/update',
      routes: [
        {
          name: '设备信息',
          path: '/update/device',
          component: './update/device',
        },
        {
          name: '软件配置',
          path: '/update/software',
          component: './update/software',
        },
        {
          name: '审查记录',
          path: '/update/review',
          component: './update/review',
        },
      ],
    },
  ],
  npmClient: 'yarn',
  mock: false,
});
