import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Rustdesk 管理后台',
  },
  routes: [
    {
      path: '/',
      redirect: '/update',
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
