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
title: 代理模式
order: 19
---

# 代理模式
# 代理模式

代理模式定义如下：

> 代理模式是一种结构型的模式，该模式让真实的对象有一个替代品（占位符），当外界打算访问真实对象的时候，该外界的感觉是访问的真实对象，但其实外界访问的是代理对象。

使用这种模式有一个好处就是代替对象可以帮助真实对象做一些过滤（代理）操作，将符合要求的访问转发给真实对象，不符合要求的访问直接被 pass 掉。

比如，明星都有经纪人作为代理。如果想请明星来办一场商业演出，只能联系他的经纪人。经纪人会把商业演出的细节和报酬都谈好之后，再把合同交给明星签。

再比如，小明遇见了他的百分百女孩 A。两天之后，小明决定给 A 送一束花来表白。刚好小明打听到 A 和他有一个共同的朋友 B，于是内向的小明决定让 B 来代替自己完成送花这件事情。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-27-071220.png" alt="image-20240327151220870" style="zoom:30%;" />

代理模式的关键在于，当外界不太方便直接访问一个对象，或者不满足访问该对象的要求的时候，提供一个代理对象来对外界的访问进行控制。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-27-071734.png" alt="image-20240327151733943" style="zoom:50%;" />

## 类图结构

代理模式的类图结构如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-27-071902.png" alt="image-20240327151902618" style="zoom:45%;" />

1. 服务接口：对真实服务进行一些约束，真实服务对象和代理对象都需要实现该接口。
2. 服务：提供真实服务的对象，实现了上面的接口。
3. 代理：首先代理对象也会实现上面的服务接口，代理对象会接受外界的访问请求，然后对这些访问请求进行过滤，将符合需求的访问请求转发给真实服务对象。
4. 客户端：想要请求一些服务，但是是和代理对象进行交互。



## 代码实现

首先我们需要有一个公共的接口，该接口无论是真实服务对象还是代理对象都会实现该接口：

```ts
export interface IService {
  operation(): void;
}
```

接下来是真实的服务对象

```ts
import { IService } from "./Interface";

// 提供真实服务的类
export class Service implements IService {
  operation(): void {
    console.log("Service operation called");
  }
}
```

接下来最最重要的其实就是代理对象：

- 也需要实现和真实服务相同的接口
- 需要对访问请求进行过滤，筛选出符合要求的访问请求
- 对符合要求的请求进行转发

```ts
import { IService } from "./Interface";
import { Service } from "./Service";

export class Proxy implements IService {
  // 代理类中包含一个真实服务的引用
  private realService: Service;

  constructor(se: Service) {
    this.realService = se;
  }

  // 对外界的访问进行一个过滤
  checkAccess(): boolean {
    // 这边可以进行一些访问控制的操作
    // ...

    return true;
  }

  // 实现接口中定义的方法
  operation(): void {
    // 这边需要对外界的访问进行一个过滤
    if (this.checkAccess()) {
      // 经过访问控制后，可以调用真实服务的方法
      this.realService.operation();
    }
  }
}
```

最后是客户端的使用：

```ts
import { Service } from "./Service";
import { Proxy } from "./Proxy";

const realService = new Service();
const proxy = new Proxy(realService);

// 外界要访问服务的时候，是和代理类打交道的
proxy.operation();  
```



## 前端中的代理模式

**ES6新增的Proxy构造方法**

该方法允许我们创建一个对象的代理，通过代理可以拦截外界对真实对象的访问，然后针对这些访问请求自定义行为：

```js
// 创建一个要被代理的对象
// 这是真实的对象
const target = {
  name: "John",
  age: 30,
};

// 定义代理的行为
// 代理对象就会对外界的访问需求进行过滤
const handler = {
  // 拦截对象属性的读取
  get(target, prop, receiver) {
    console.log(`[GET]: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  // 拦截对象属性的设置
  set(target, prop, value, receiver) {
    console.log(`[SET]: ${prop} = ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },
};

// 使用Proxy构造函数创建代理对象
// new Proxy 会返回一个对象，该对象就是针对真实对象的代理对象
const proxy = new Proxy(target, handler);

// 测试代理的行为
// 之后就通过代理对象来访问真实对象的成员
console.log(proxy.name); // 输出：[GET]: name 以及 John
proxy.age = 31; // 输出：[SET]: age = 31
```

