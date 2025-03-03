---
nav:
  title: 笔记
  path: /notes
group:
  title: 中枢-工程化
  order: 2
type:
  title: 包管理器
  order: 2
title: npm 脚本
order: 7
---

# npm 脚本

在开发的过程中，我们可能会反复使用很多的 CLI 命令，例如：

- 启动工程命令（node 或 一些第三方包提供的CLI命令）
- 部署工程命令（一些第三方包提供的CLI命令）
- 测试工程命令（一些第三方包提供的CLI命令）

这些命令纷繁复杂，根据第三方包的不同命令也会不一样，非常难以记忆

于是，npm 非常贴心的支持了脚本，只需要在 package.json 中配置 scripts 字段，即可配置各种脚本名称

之后，我们就可以运行简单的指令来完成各种操作了

运行方式是 ```npm run 脚本名称```

不仅如此，npm 还对某些常用的脚本名称进行了简化，下面的脚本名称是不需要使用run的：

- start
- stop
- test

一些细节：

- 脚本中可以省略npx
- start脚本有默认值：node server.js
