---
nav:
  title: 笔记
  path: /notes
group:
  title: 中枢-工程化
  order: 2
type:
  title: 模块化
  order: 2
title: AMD和CMD
order: 5
---

# AMD和CMD

## AMD

```js

define([依赖的模块列表], function(模块名称列表){
    //模块内部的代码
    return 导出的内容
})

```


## CMD

全称是Common Module Definition，公共模块定义规范

sea.js实现了CMD规范

在CMD中，导入和导出模块的代码，都必须放置在define函数中

```js

define(function(require, exports, module){
    //模块内部的代码
})

```
