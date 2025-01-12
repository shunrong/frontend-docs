import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/front-doc/',
  publicPath: '/front-doc/',
  themeConfig: {
    name: 'lime-lib',
    nav: [
      { title: '首页', link: '/' },
      { title: '笔记', link: '/guide' },
      { title: '组件', link: '/components' },
      { title: 'hooks', link: '/hooks' },
    ],
    sidebar: {
      '/guide': [
        {
          title: '快速上手',
          children: [
            { title: '变量', link: '/guide' },
            { title: '安装', link: '/guide/install' },
          ],
        },
      ],
      '/components': [
        {
          title: '基础组件',
          children: [
            { title: '按钮 Button', link: '/components/button' },
            { title: '输入框 Input', link: '/components/input' },
          ],
        },
        {
          title: '数据展示',
          children: [
            { title: '表格 Table', link: '/components/table' },
            { title: '列表 List', link: '/components/list' },
          ],
        },
      ],
      '/hooks': [
        {
          title: '状态相关',
          children: [
            { title: 'useBoolean', link: '/hooks/use-boolean' },
            { title: 'useReducer', link: '/foo/use-reducer' },
          ],
        },
        {
          title: '副作用相关',
          children: [
            { title: 'useEffect', link: '/foo/use-effect' },
            { title: 'useLayoutEffect', link: '/foo/use-layout-effect' },
          ],
        },
      ],
    },
  },
  resolve: {
    docDirs: ['docs', 'src'],
  },
});
