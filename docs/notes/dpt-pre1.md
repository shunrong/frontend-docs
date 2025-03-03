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
title: 前置知识1
order: 2
---

# 前置知识1

- 类和对象
- 抽象
- 封装


## 类和对象

所谓类，是针对某一类事物的属性和行为的抽象，经常会把类称之为模板或者蓝图

在描述一个类的时候，我们经常会使用 UML 类图（Unified Modeling Language：统一建模语言），例如：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-21-070115.png" alt="image-20240321150115359" style="zoom:70%;" />

所谓对象，就是根据类来创建的具体的实例，所以我们一般称之为实例对象。一个实例对象会拥有类中所定义的属性和方法。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-21-070258.png" alt="image-20240321150258926" style="zoom:70%;" />

**JavaScript中的类和对象**

在最早期，JavaScript通过函数去模拟类：

```js
// 构造函数
function Person(name, age){
  this.name = name;
  this.age = age;
}
// 有方法的话挂在原型对象上面
Person.prototype.sayHello = function(){
  console.log("Hello");
}
```

有了 ES6 之后，正式推出了 class 关键字：

```js
class Person {
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
  sayHello(){
    console.log("Hello");
  }
}
```

**TypeScript中类与对象**

在 TypeScript 中，多了 public 和 private 来控制成员的可访问性以及相应的类型信息：

```ts
class Person {
  private name: string;
  private age: number;
  
  public constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  public sayHello(){
    console.log("Hello");
  }
}

const zhangsan = new Person("张三", 20);
```

关于面向对象程序设计，里面有 4 个非常关键的概念：

- 抽象
- 封装
- 继承
- 多态

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-21-070736.png" alt="image-20240321150735967" style="zoom:60%;" />

包括我们后要介绍的所有的设计模式，也是围绕着这 4 个点展开的。



## 抽象

抽象是程序设计中非常重要的一种计算思维，和现实生活中抽象的含义有点不同：

- 现实生活中：含糊、模糊、不清晰
- 计算机科学：将关键部分从细节中分离出来，忽略不必要的细节，只关注问题的关键方面。

因此，在进行面向对象程序设计的时候，针对一个事物，我们只需要关注特定的属性和特定的行为即可，其他不重要的通通忽略掉。

遇到不同的需求，哪怕是同一个事物，抽象的程度也是不一样的。

- 飞行模拟器程序
- 航班预订程序

这两个程序都会涉及到飞机这个事物，针对飞机这个事物，我们会写一个飞机类，但是因为需求不同，我们进行抽象的时候，着力点是不一样的。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-21-071331.png" alt="image-20240321151331568" style="zoom:67%;" />

实际上在现实生活中，也有抽象（提取关键点）的概念：

- **地图**：地图是现实世界地理特征的抽象表示，它去除了不必要的细节，仅展示道路、地标、边界等重要信息。

- **图标和符号**：在日常生活中，各种图标和符号（如交通标志、应用程序图标）都是对复杂信息或指令的抽象。

- **时间表和日程**：时间表和日程是时间管理的抽象，它们将时间分割为小时、分钟，并分配给不同的活动或事件。
- .....



## 封装

所谓封装，就是隐藏内部细节，不直接暴露给外部。

当我们对某一些成员进行了封装之后，外部是没有办法直接访问到的，但是一般会提供一种机制，让外部能够间接的访问到，在面向对象设计里面，一般会提供存取器（getter/setter）来供外部获取和设置私有属性。

**JavaScript中的封装**

在早期的时候，开发人员通过函数作用域和闭包来模拟私有成员

```js
function Person(name, age) {
  // 模拟私有属性
  var _name = name;
  var _age = age;

  // 私有方法
  function privateMethod() {
    console.log("这是一个私有方法");
  }

  // 提供相应的 getter 和 setter 方法
  this.getName = function () {
    return _name;
  };

  this.setName = function (name) {
    _name = name;
  };
}
var p1 = new Person("John", 20);
console.log(p1._name);
```

现在有了 ES6，ES6 中提供了 class，在最新的 ES2020 中还支持私有成员了，通过一个 # 表示这是私有成员

```js
class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  #privateMethod() {
    console.log("这是一个私有方法");
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }
}

const p = new Person("John", 20);
console.log(p.name);
p.name = "zhangsang";
console.log(p.name);
```



**TypeScript中的封装**

直接提供了 private 关键字，来控制某个成员是否是私有的。

注意如果要为某个成员提供 getter/setter，那么成员名不能相同，否则会报 Duplicate Identifier

```ts
export class Person {
  private _name: string;
  private _age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  private privateMethod(): void {
    console.log("这是一个私有方法");
  }

  sayHello() {
    console.log("Hello");
  }

  get name() {
    return this._name;
  }

  set name(value) {
    // 之所以要设置 getter/setter 是因为我们可以在这里做一些额外的操作
    // 比如对 value 做一些校验
    this._name = value;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    if (value > 100) {
      console.log("年龄不能大于100");
      this._age = 20;
    } else {
      this._age = value;
    }
  }
}

const p = new Person("John", 18);
console.log(p.name);
p.age = 200;
console.log(p.age);
```

