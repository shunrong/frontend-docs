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
title: 单一职责原则
order: 7
---

# 单一职责原则

所谓 SOLID 原则，罗伯特·马丁的著作《敏捷软件开发：原则、模式与实践》，他在这本书里面，就提到了 5 个原则：

- 单一职责原则（**S**ingle Responsibility Principle）
- 开闭原则（**O**pen-Closed Principle）
- 里氏替换原则（**L**iskov Substitution Principle）
- 接口隔离原则（**I**nterface Segregation Principle）
- 依赖倒置原则（**D**ependency Inversion Principle）



单一职责原则（**S**ingle Responsibility Principle），简称 SRP.

> 一个类应该只有一个引起它变化的原因。

也就是说，一个类应该只负责一项任务，如果不遵循单一职责原则，在一个类里面书写了过多的功能，那么就会导致修改一个功能的时候，影响其他功能。

假设我们现在有一个应用，该应用需要记录一些日志：

```ts
// 这种设计就是不好的，因为你的日志逻辑和订单业务逻辑混合在了一起
class OrderProcessor {
    processOrder(orderId: number) {
      	// 进行日志的记录
        console.log(`Processing order ${orderId}`); 
      	// 订单处理的业务逻辑
    }
}
```

如果按照单一职责原则，我们就应该将日志记录的职责从 OrderProcessor 类里面分离出来，创建一个专门用于日志记录的类：

```ts
// 这个类就是专门负责日志记录
class Logger {
    log(message: string) {
        console.log(message); 
    }
}

class OrderProcessor {
    private logger: Logger = new Logger();
    
    processOrder(orderId: number) {
        this.logger.log(`Processing order ${orderId}`);
    }
}
```

再看一个例子，比如有一个用户类，该类里面有两个方法，分别是处理用户信息的获取以及用户数据的存储：

```ts
// 这是不好的设计，一个类拥有过多的职责
class User {
  // 获取用户信息
  getUser(id: number) {
      
  }
  // 存储用户信息
  saveUser(user: any) {
      
  }
}
```

比较好的做法，将职责明确分离到不同的类中，**<u>每个类只负责一种功能</u>**。

```ts
// 好的设计

// 该类主要是获取用户信息
class UserInfo {
  getUser(id: number) {
     
  }
}

// 该类主要是存储用户信息
class UserStorage {
  saveUser(user: any) {
     
  }
}
```



SRP 是所有原则中最简单，但同时也是最难正确应用的原则之一。对于初学者来讲，最大的难度就是何时应该分离，是否应该分离。

>比如，如果一个需求的变化，有两个职责总是同时变化的，那就不必分离它们。举个例子，在进行 ajax 请求的时候，创建 xhr 对象和发送 xhr 请求几乎都是在一起的，那么此时创建 xhr 对象的职责和发送 xhr 请求的职责就没必要分开。

另外，只有在职责确定要发生变化的时候，此时分离才有意义。如果两个职责耦合在一起，但是这两个职责没有发生变化的征兆，我们也不需要进行分离。

一方面，我们接受设计原则的指导，但是在学习的时候一定要灵活，**<u>根据具体的场景来具体的分析</u>**。在实际开发中，其实存在一些违反 SRP 原则的情况：

>比如 jQuery 的 attr 方法，就明显违背了 SRP 原则，既负责赋值，又负责取值。这对于 jQuery 的维护者来说，会带来一些困难，但是对于 jQuery 的使用者来讲，却降低了心智负担。
