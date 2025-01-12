---
nav:
  title: 组件
  path: /components
group:
  title: 基础组件
  order: 1
---

# Button 按钮

按钮用于开始一个即时操作。

## 代码演示

### 按钮类型

按钮有五种类型：主按钮、次按钮、虚线按钮、链接按钮和文本按钮。

<code src="./demo/type.tsx"></code>

### 按钮尺寸

按钮有大、中、小三种尺寸。

<code src="./demo/size.tsx"></code>

### 按钮形状

按钮有三种形状：默认、圆形和圆角。

<code src="./demo/shape.tsx"></code>

### 加载中状态

添加 loading 属性即可让按钮处于加载状态。

<code src="./demo/loading.tsx"></code>

### 禁用状态

添加 disabled 属性即可让按钮处于禁用状态。

<code src="./demo/disabled.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `primary` \| `default` \| `dashed` \| `link` \| `text` | `default` |
| size | 按钮大小 | `large` \| `middle` \| `small` | `middle` |
| shape | 按钮形状 | `default` \| `circle` \| `round` | `default` |
| disabled | 是否禁用 | boolean | false |
| loading | 是否加载中 | boolean | false |
| htmlType | 设置 button 原生的 type 值 | `submit` \| `button` \| `reset` | `button` |
| icon | 设置按钮的图标组件 | ReactNode | - |
| onClick | 点击按钮时的回调 | (event) => void | - |

