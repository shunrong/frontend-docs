---
nav:
  title: 笔记
  path: /notes
group:
  title: 中枢-工程化
  order: 2
type:
  title: 浏览器
  order: 3
title: 浏览器离线存储概述
order: 4
---

# 浏览器离线存储概述

![image-20211126131413497](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-26-051413.png)


大致分为：



- 用户界面（*user interface*）

- 浏览器引擎（*browser engine*）

- 渲染引擎（*rendering engine*）

- 网络（*networking*）

- *JS* 解释器（*JavaScript interpreter*）

- 用户界面后端（*UI backend*）

- 数据存储（*data storage*）



而本章节我们就一起来看一下 *Data Persistence/storage* 这个部分，翻译成中文叫做浏览器离线存储或者本地存储。顾名思义，就是内容存储在浏览器这一边。



目前常见的浏览器离线存储的方式如下：



- *Cookie*
- *Web Storage*
- *WebSQL*
- *IndexedDB*
- *File System*

