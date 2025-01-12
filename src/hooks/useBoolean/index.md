---
nav:
  title: Hooks
  path: /foo
group:
  title: 状态相关
  order: 1
---

# useBoolean

一个优雅地管理 boolean 状态的 Hook。

## 何时使用

- 需要管理布尔状态时
- 需要便捷的切换、设置状态方法时
- 适用于管理开关、显示隐藏、加载等状态

## 代码演示

### 基础用法

最简单的用法。

<code src="./demo/basic.tsx"></code>

### 进阶用法

```tsx | pure
import { useBoolean } from 'lime-lib';

const [state, { toggle, setTrue, setFalse, set }] = useBoolean(false);

// 切换状态
toggle();

// 设置为 true
setTrue();

// 设置为 false
setFalse();

// 设置任意值
set(true);
```

## API

```ts
const [state, { toggle, setTrue, setFalse, set }] = useBoolean(defaultValue?: boolean);
```

### Params

| 参数         | 说明     | 类型      | 默认值  |
| ------------ | -------- | --------- | ------- |
| defaultValue | 默认值   | `boolean` | `false` |

### Result

| 参数    | 说明                        | 类型                |
| ------- | --------------------------- | ------------------- |
| state   | 当前状态值                  | `boolean`           |
| actions | 操作集合，包含以下操作方法  | `UseBooleanActions` |

### Actions

| 参数     | 说明           | 类型                      |
| -------- | -------------- | ------------------------- |
| toggle   | 切换状态值     | `() => void`              |
| setTrue  | 设置为 true    | `() => void`              |
| setFalse | 设置为 false   | `() => void`              |
| set      | 设置为指定值   | `(value: boolean) => void`|

## FAQ

### 1. 为什么要使用 useBoolean？

useBoolean 提供了一组语义化的操作方法，使得布尔状态的管理更加直观和便捷。相比直接使用 useState，它能让代码更具可读性和可维护性。

### 2. 是否支持受控模式？

useBoolean 主要用于组件内部状态管理，如果需要受控模式，建议直接使用 useState 或其他状态管理方案。
