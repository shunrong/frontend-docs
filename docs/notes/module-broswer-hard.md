---
nav:
  title: 笔记
  path: /notes
group:
  title: 中枢-工程化
  order: 2
type:
  title: 模块化
  order: 1
title: 浏览器端模块化的难题
order: 4
---

# 浏览器端模块化的难题

**CommonJS的工作原理**

当使用```require(模块路径)```导入一个模块时，node会做以下两件事情（不考虑模块缓存）：

1. 通过模块路径找到本机文件，并读取文件内容
2. 将文件中的代码放入到一个函数环境中执行，并将执行后module.exports的值作为require函数的返回结果

正是这两个步骤，使得CommonJS在node端可以良好的被支持

可以认为，**CommonJS是同步的**，必须要等到加载完文件并执行完代码后才能继续向后执行

**当浏览器遇到CommonJS**

当想要把CommonJS放到浏览器端时，就遇到了一些挑战

1. 浏览器要加载JS文件，需要远程从服务器读取，而网络传输的效率远远低于node环境中读取本地文件的效率。由于CommonJS是同步的，这会极大的降低运行性能
2. 如果需要读取JS文件内容并把它放入到一个环境中执行，需要浏览器厂商的支持，可是浏览器厂商不愿意提供支持，最大的原因是CommonJS属于社区标准，并非官方标准

**新的规范**

基于以上两点原因，浏览器无法支持模块化

可这并不代表模块化不能在浏览器中实现

要在浏览器中实现模块化，只要能解决上面的两个问题就行了

解决办法其实很简单：

1. 远程加载JS浪费了时间？做成异步即可，加载完成后调用一个回调就行了
2. 模块中的代码需要放置到函数中执行？编写模块时，直接放函数中就行了

基于这种简单有效的思路，出现了AMD和CMD规范，有效的解决了浏览器模块化的问题。
