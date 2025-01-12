import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/frontend-docs/',
  publicPath: '/frontend-docs/',
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'lime-lib',
    nav: [
      { title: '首页', link: '/' },
      { title: '笔记', link: '/notes/javascript-history' },
      { title: '组件', link: '/components/button' },
      { title: 'hooks', link: '/hooks/use-boolean' },
    ],
    defaultMenuCollapseLevel: 1,
    showThemeSwitch: true,
    rtl: false,
    prefersColor: {
      default: 'light',
      switch: true,
    },
  },
  resolve: {
    docDirs: ['docs', 'src'],
  },
});
