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
title: 单例模式
order: 13
---

# 单例模式

单例模式是属于创建型模式的一种。

定义：

> 保证一个类仅仅只有一个实例对象，并且提供一个对该实例对象的全局访问点。

单例模式无论是在前端还是后端，应用的场景都非常广泛：

- 后端：线程池、全局缓存
- 前端：浏览器中的 window 对象、有一些窗口（登录注册窗口）全局只能有一个



## 代码实现

如果是 JS 的话，最常见的方式是书写一个辅助方法（代理方法），通过该方法将一个类转换为单例类。

例如：

```js
// 我们需要一个辅助方法
// 该方法可以将一个类转为一个单例类
function getSingle(fn) {
  let instance = null; // 用于存储唯一的实例对象
  return function (...args) {
    if (instance !== null) {
      // 进入此分支，说明当前已经存在实例对象
      return instance;
    }
    // 没有进入上面的 if，说明当前不存在实例对象
    instance = new fn(...args);
    return instance;
  };
}

class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello ${this.name}`;
  }
}

const p1 = new Person("John");
const p2 = new Person("John");
console.log(p1 === p2); // false

const SinglePerson = getSingle(Person);
const p3 = new SinglePerson("John");
const p4 = new SinglePerson("John");
console.log(p3 === p4); // true
```

在上面的代码中，我们将一个类通过辅助方法转换为单例类，通过闭包的方式来存储全局唯一的实例对象，之后无论外部 new 多少次，只有 instance 有值，就会直接返回 instance 所存储的实例对象



如果是 TS，可以利用 TS 本身的特性，比如使用 private 来控制 constructor 的可访问性：

```ts
export class Person {
  private static instance: Person; // 静态属性，用于存储全局唯一的实例
  private name: string;
  private age: number;

  // 私有化了构造方法，外部无法通过 new Person() 来创建实例
  private constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public static getInstance(name: string, age: number): Person {
    // 进行单例的判断
    if (Person.instance === null) {
      Person.instance = new Person(name, age);
    }
    // 没有进入上面的分支，说明已经 new 过一次，实例对象存储在 instance 中，直接返回即可
    return Person.instance;
  }

  sayHello(){
    console.log("Hello");
  }
}

const p1 = Person.getInstance("Tom", 18);
const p2 = Person.getInstance("John", 18);
console.log(p1 === p2); // true
```



## 场景举例

>想象一下，你正在开发一个大型的应用，这个应用需要加载和使用许多全局配置：
>
>- 如 API 的基础 URL
>- 第三方服务的密钥
>- 应用的主题设置
>- ....
>
>这些配置在应用的不同部分被多次读取，但这些配置只需要加载一次。

这种场景就非常适合使用单例模式：

```ts
class AppConfig {
  private static instance: AppConfig;
  public readonly apiUrl: string;
  public readonly apiKey: string;
  // 其他配置项...

  private constructor() {
    // 假设我们有一个 getConfig 方法来从环境变量或者配置文件中获取这些配置
    this.apiUrl = "https://api.example.com";
    this.apiKey = "secretApiKey";
    // 初始化其他配置项...
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
}

// 使用
const config1 = AppConfig.getInstance();
const config2 = AppConfig.getInstance();

console.log(config1 === config2); // true
console.log(config1.apiUrl); // https://api.example.com
```

