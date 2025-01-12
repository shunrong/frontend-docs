---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  order: 2
---

# Avatar 头像

用来代表用户或事物，支持图片、图标或字符展示。

## 代码演示

### 基本用法

头像有三种尺寸和两种形状可选。

<code src="./demo/basic.tsx"></code>

### 类型展示

支持图片、图标或字符。

<code src="./demo/type.tsx"></code>

### 自定义尺寸

可以自定义头像的大小。

<code src="./demo/custom-size.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| alt | 图片无法显示时的替代文本 | string | - |
| icon | 设置头像的图标类型 | ReactNode | - |
| shape | 指定头像的形状 | `circle` \| `square` | `circle` |
| size | 设置头像的大小 | `large` \| `default` \| `small` \| number | `default` |
| src | 图片类头像的资源地址 | string | - |
| onError | 图片加载失败的事件 | () => boolean | - | 