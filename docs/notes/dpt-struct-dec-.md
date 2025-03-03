---
nav:
  title: 笔记
  path: /notes
group:
  title: 中枢-工程化
  order: 2
type:
  title: 设计模式
  order: 5
title: 装饰器模式
order: 17
---


# 装饰器模式

- 在 TypeScript 里面就已经支持装饰器的语法了
- Angular2 里面也大量的用到了装饰器，并且还是 Angular 的核心之一
  - 定义组件 @Component
  - 依赖注入 @Injectable
  - 输入属性 @Input
- NestJS 里面也大量的用到了装饰器
  - 定义模块 @Module
  - 依赖注入 @Injectable
  - 定义控制器 @Controller

就连原生 JS，目前也在考虑将装饰器纳入到标准里面。

装饰器的背后，其实就是一种设计模式的体现，那就是装饰器模式。



## 基本介绍

装饰器模式定义：

> 这是一种结构型设计模式，允许你将对象（A）放入包含行为的特殊对象里面，从而为原来的对象（A）绑定新的行为。

因此装饰器的本质，**<u>其实就是组合</u>**，而非继承。

假设你现在需要一个有通知功能的库，其他程序可以用你这个库来发送一些重要的通知。

一开始的设计就是一个 Notifier 类，里面有几个成员变量：

- 构造函数
- 一个 send 方法：通过发送邮件的方式来发送通知

其他程序使用你这个库的形式如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-26-011531.png" alt="image-20240326091530941" style="zoom:70%;" />

目前库的功能是 OK 的，但是需求变化了！

许多客户端希望通过不同的方式来收到通知，例如通过发送短信、微信、QQ，那么此时我们就会去扩展 Notifier 这个类，创建一些子类：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-26-011812.png" alt="image-20240326091811948" style="zoom:50%;" />

好像上面的需求也能够完美的解决。

但是，需求又变化了！

有些客户期望多个渠道收到通知，比如有客户希望微信和 QQ 同时收到通知，有客户端希望短信和微信收到通知....

这个时候你就会发现，如果还是按照之前的设计，那么子类的数量会成倍的增加：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-26-012217.png" alt="image-20240326092216709" style="zoom:50%;" />

像这种场景下，最佳的解决方案是使用组合而非继承，这也是前面在介绍设计原则的时候，其中就提到了组合优于继承。

此时我们就可以使用装饰器模式，新的结构如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-26-012529.png" alt="image-20240326092528814" style="zoom:70%;" />

组合这种思想，在现实生活中也是存在的：

>例如穿衣服就是一个使用装饰的例子。觉得冷时，你可以穿一件毛衣。如果穿毛衣还觉得冷，你可以再套上一件夹克。如果遇到下雨，你还可以再穿一件雨衣。所有这些衣物都“扩展”了你的基本行为，但它们并不是你的一部分，如果你不再需要某件衣物，可以方便地随时脱掉。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-26-012807.png" alt="image-20240326092807067" style="zoom:50%;" />



## 具体类图

装饰器模式的类图如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-26-013947.png" alt="image-20240326093947121" style="zoom:60%;" />

1. 部件：声明装饰器和被封装对象的一个公共接口
2. 具体的部件：具体的部件会去执行在部件中所定义的方法。
3. 装饰器的基础类：在装饰器基础类内部，会定义统一的接口方法，回头具体的各个装饰器，会实现该方法
4. 具体的装饰器类：首先会继承装饰器的基础类，然后提供接口方法的不同实现。
5. 客户端：可以使用多层的装饰器来封装具体的部件，从而达到功能增强的效果。



具体的代码请参阅随堂课堂代码。



## 前端中的装饰器

接下来我们来看一下 TS 里面的装饰器具体如何来写。

> 在 TS 中，目前装饰器还是一个实验性的语法，因此在 TS 的配置文件中，一定要记得显式的将 experimentalDecorators 配置为 true。

在 TS 中，装饰器的写法如下所示：

```ts
export function QQDecorator(qqId: string): ClassDecorator {
  return function (constructor: Function) {
    const send = constructor.prototype.send; // 先拿到原型上面的send方法
    constructor.prototype.send = function (message: string) {
      // 在包装之前要先执行一遍原来的send方法
      send.apply(this, arguments);
      // 然后再扩展自己的逻辑
      console.log(`QQ message sent to ${qqId}: ${message}`);
    };
  };
}
```

之前具体的装饰器类变成了装饰器工厂，该工厂方法被调用的时候，会返回一个装饰器类：

```ts
const send = constructor.prototype.send;
```

这行代码就是拿到原本的 send 方法，然后接下来会去重写 send 方法

```ts
constructor.prototype.send = function (message: string) {};
```

重写的时候，首先要执行原来的 send 方法，然后再扩展相应的装饰器逻辑：

```ts
// 在包装之前要先执行一遍原来的send方法
send.apply(this, arguments);
// 然后再扩展自己的逻辑
console.log(`QQ message sent to ${qqId}: ${message}`);
```

