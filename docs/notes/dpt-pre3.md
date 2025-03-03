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
title: 前置知识3
order: 4
---

# 前置知识3

- 抽象类
- 接口



## 抽象类

抽象类是一种特殊的类，你**<u>无法直接实例化它</u>**。

在抽象类中，会包含一些抽象方法，而所谓抽象方法，就是**<u>只有方法签名，没有方法的实现</u>**。

继承了抽象类的子类会有两个特点：

- 如果一个子类继承了抽象类，那么必须要实现抽象类里面所有的抽象方法。
- 如果一个子类在继承抽象类之后，没有实现父类（抽象类）的抽象方法，那么这个子类也必须是一个抽象类

**抽象类主要的目的是为其他类提供一个基础的可扩展的框架，具体的实现细节由继承了抽象类的子类来决定**

例子一：

>比如我要做一个中国象棋，每一类棋子都可以声明成一个类。例如马是一个类，兵是一个类，等等。那么这些类作为棋子，有一些共通的方法，比如都拥有移动方法，所以可以写一个它们的父类。
>
>但是每个棋子的移动方法是不相同的，所以在父类中，移动方法只能是一个抽象方法。父类也只能是一个抽象类。

例子二：

>比如英雄联盟或者王者荣耀这种游戏，里面有很多英雄，比如剑士、弓箭手、精灵、魔法师、野蛮人，反正有各种职业的英雄。那么，大家想一想，这些英雄是不是有一些共同的属性和方法。
>
>- 比如属性：都有血量、魔法值
>- 比如方法：都有移动方法，攻击方法
>
>那么我们就可以给他们写一个父类，比如 Hero 类，Hero 这个类里面就有这些属性和方法。接下来其他英雄都来继承这个 Hero 类。然后请你思考一个问题，比如每个英雄都有攻击方法，但是攻击方法是不同的。那么我不可能在父类将攻击方法写死，因为继承的每个英雄，攻击方法都是不一样，所以我就只书写一个方法头，具体的实现由子类来实现，这样的方法就是抽象方法。有抽象方法的类，自然也就是一个抽象类。

在 TS 中，可以使用 abstract 来声明一个抽象类：

```ts
abstract class Animal {
  // 定义抽象方法
  abstract makeSound(): void;

  // 普通方法
  move(): void {
    console.log("roaming the earth...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("wang wang wang");
  }
}

const dog = new Dog();
dog.makeSound();
dog.move();
```



在一个抽象类中，可以定义抽象方法，但是并不存在什么抽象属性。不过，我们可以通过定义抽象的 getter/setter 方法来间接的实现“抽象属性”的效果，通过这种方式来强制让子类实现特定的属性访问逻辑。

```ts
abstract class Person {
  abstract get name(): string;
  abstract set name(value: string);

  abstract sayHello(message: string): void;
}

class Student extends Person {
  private _name: string;

  constructor(name: string) {
    super();
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  sayHello(message: string): void {
    console.log(message);
  }
}

const zhangsan = new Student("张三");
zhangsan.sayHello("你好");
console.log(zhangsan.name);
zhangsan.name = "zhangsan";
console.log(zhangsan.name);
```



## 接口

接口通常用来定义一个对象可以有哪些属性和方法，但它不关心这些方法和属性的实现细节。

在 TS 里面，通过 interface 关键字来定义一个接口，接口里面可以书写属性和方法。

当有了接口之后，一个类可以通过 implements 去实现接口，实现接口意味着必须要要实现接口中所定义的属性和方法。

```ts
interface IAnimal {
  // 属性
  name: string;
  age: number;

  // 方法
  makeSound(): void;
}

export class Dog implements IAnimal {
  name: string;
  age: number;
  breed: string;

  constructor(name: string, age: number, breed: string) {
    this.name = name;
    this.age = age;
    this.breed = breed;
  }

  makeSound(): void {
    console.log("wang wang wang");
  }
}

const dog = new Dog("doggie", 3, "金毛");
```

另外，一个类可以同时去实现多个接口：

```ts
interface IAnimal {
  // 属性
  name: string;
  age: number;

  // 方法
  makeSound(): void;
}

interface IGame {
  dazhao(): void;
}

export class Dog implements IAnimal, IGame {
  name: string;
  age: number;
  breed: string;

  constructor(name: string, age: number, breed: string) {
    this.name = name;
    this.age = age;
    this.breed = breed;
  }

  makeSound(): void {
    console.log("wang wang wang");
  }

  dazhao(): void {
    console.log("dazhao");
  }
}

const dog = new Dog("doggie", 3, "金毛");
dog.makeSound();
dog.dazhao();
```



## 用抽象类还是用接口

我们先从语法层面来区分：

- 抽象类：不存在抽象属性的约束，并且一个子类只能继承一个抽象类
- 接口：不仅存在方法的约束，还存在属性的约束，并且一个子类可以实现多个接口

实际上你要理清楚这两者之间的区别，不能简简单单的只是从语法层面去区分，而是要从面向对象背后所代表的哲学含义去深入理解：

- 抽象类：背后所代表的思想是继承
- 接口：背后所代表的思想是组合

比如我现在有一个鸟类，这个鸟类是一个抽象类，里面有 fly 这个抽象方法。接下来需要一些具体的子类：喜鹊类、麻雀类、老鹰类，这些类都需要 fly 这个方法，它们去继承这个鸟类，完全没有问题。

比如现在我们有一个机器人类，或者人类，也需要 fly 这个方法，但是现在机器人类、人类去继承鸟类，是不合适的。

因此在这种场景下，就非常适合书写成一个接口，然后让机器人或者人类来实现这个接口即可。

- 抽象类：Where do you come from ？
- 接口：What ability do you have ？