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
title: 工厂方法模式
order: 15
---

# 工厂方法模式

前面所介绍的简单工厂模式实际上并不是 GoF 所提出的 23 种设计模式里面的一种，更像是一种编程习惯。

但是这种简单工厂模式的编写习惯存在一定的问题。



## 简单工厂存在的问题

假设现在我们有这样的一个需求：

>假设我们有一个日志记录系统，需要根据不同的环境（如文件日志、数据库日志）来记录日志。

那么根据我们上节课所介绍的简单工厂模式，写出来的代码如下：

```ts
// 产品对应的统一接口
interface Logger {
  log(message: string): void;
}

// 文件的形式记录日志
// 实现了 Logger 接口
class FileLogger implements Logger {
  log(message: string) {
    console.log(`File log: ${message}`);
  }
}

// 数据库的形式记录日志
// 实现了 Logger 接口
class DatabaseLogger implements Logger {
  log(message: string) {
    console.log(`Database log: ${message}`);
  }
}

// 一个工厂类
// 提供了 createLogger 方法，根据不同参数来创建不同的产品
class LoggerFactory {
  static createLogger(type: string): Logger {
    switch (type) {
      case "file":
        return new FileLogger();
      case "database":
        return new DatabaseLogger();
      default:
        throw new Error("Unknown logger type");
    }
  }
}

const logger = LoggerFactory.createLogger("file");
logger.log("This is a message.");
```

简单工厂模式所存在的问题：

工厂类的职责过重，每一次需要新增一个类型的产品的时候，都需要修改工厂类内部的逻辑，不符合设计原则里面的开放-封闭原则。



## 工厂方法类图结构

标准的工厂方法模式，其核心就是一个产品对应一个工厂，而不是将创建不同类型的产品的逻辑放入到一个方法里面。

假设有产品 A，B，C，那么在标准的工厂方法模式里面，就有对应的工厂 A，B，C，假设现在需要新增一个产品 D，我们只需要新增一个对应的工厂 D 即可，原来的工厂是不受任何影响的。

下面是标准工厂模式的类图结构：

![image-20240322104208915](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-22-024209.png)

1. 产品接口：对所有的产品进行统一的接口限制
2. 具体产品：每一种产品都是实现了产品接口的
3. 创建者接口：用于约束多个工厂的接口
4. 具体的创建者：对应的就是多个工厂，每个工厂都实现了工厂接口的



## 具体代码

详细参阅课堂随堂代码。