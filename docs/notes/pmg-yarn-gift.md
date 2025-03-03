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
title: yarn 的特别礼物
order: 12
---

# yarn 的特别礼物

使用```yarn check```命令，可以验证package.json文件的依赖记录和lock文件是否一致

这对于防止篡改非常有用

2. **yarn audit**

使用```yarn audit```命令，可以检查本地安装的包有哪些已知漏洞，以表格的形式列出，漏洞级别分为以下几种：

- INFO：信息级别
- LOW: 低级别
- MODERATE：中级别
- HIGH：高级别
- CRITICAL：关键级别

3. **yarn why**

使用```yarn why 包名```命令，可以在控制台打印出为什么安装了这个包，哪些包会用到它

4. **yarn create**

非常有趣的命令

今后，我们会学习一些脚手架，所谓脚手架，就是使用一个命令来搭建一个工程结构

过去，我们都是使用如下的做法：

1) 全局安装脚手架工具
2) 使用全局命令搭建脚手架

由于大部分脚手架工具都是以```create-xxx```的方式命名的，比如react的官方脚手架名称为```create-react-app```

因此，可以使用```yarn create```命令来一步完成安装和搭建

例如：

```shell
yarn create react-app my-app
# 等同于下面的两条命令
yarn global add create-react-app
create-react-app my-app
```

