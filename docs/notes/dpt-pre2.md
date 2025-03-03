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
title: 前置知识2
order: 3
---

# 前置知识2

这节课我们继续来回顾面向对象编程的另外两个基本特性：

- 继承
- 多态



## 继承

在 OOP 中，继承是一种允许新创建的类（称为子类或派生类）继承另一个类（称为父类或基类）的属性和方法的机制。通过继承，子类自动包含了父类的所有属性和方法（除了私有成员），使得开发者可以在这个已有的基础上构建更复杂或特定用途的功能。

**JavaScript中的继承**

早期的时候，JavaScript 中的继承的写法五花八门，其中有一种最为熟知的模式，称之为组合模式实现继承：

```js
function Person(name, age){
  this.name = name;
  this.age = age;
}
Person.prototype.sayHello = function(){ ... }

// 子类
function Student(name, age, gender, score){
  Person.apply(this, [name, age]);
  this.gender = gender;
  this.score = score;
}
Student.prototype = new Person();                                       
```

但是这种组合模式会有一个问题：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-12-28-125848.png" alt="image-20221228205848531" style="zoom:50%;" />

但是上面的这种结构，当我们执行到 Person.apply(this, [name, age]); 这一行代码，会执行到 Person 函数内部的 this.name = name 以及 this.age = age，这里的 this 指定的是 Student 的实例对象，所以在 Student 实例对象上面，会有一份 name 和 age 属性。

之后，在执行 Student.prototype = new Person();  这行代码的时候，会实例化一个 Person 实例对象，这个 Person 的实例对象上面又会有一份 name 和 age，导致了属性会多一份，Student 实例对象上面会有一份，Student 原型对象上面也会有一份

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-12-28-130736.png" alt="image-20221228210736502" style="zoom:50%;" />

正因为组合模式有这样的问题，所以它从经典模式跌落成了伪经典模式。

后面就出现了圣杯模式来解决这个问题，圣杯模式的核心就是拿一个空的构造函数去当中间人，从而解决这个问题：

```js
// target: 子类---> Student
// original: 父类 ---> Person
function inherit(target, original){
  function F(){} // 一个空的构造函数
  F.prototype = original.prototype; // 让 F 的原型对象指向父类的原型对象
  target.prototype = new F();
  // 修正一下 constructor
  target.prototype.constructor = target;
}


// 父类
function Person(name, age){
  this.name = name;
  this.age = age;
}
Person.prototype.sayHello = function(){ ... }

// 子类
function Student(name, age, gender, score){
  Person.apply(this, [name, age]);
  this.gender = gender;
  this.score = score;
}
                                       
inherit(Student, Person);
```

圣杯模式的原型链指向图：

![image-20221228211806227](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-12-28-131806.png)

ES6 中实现继承

```js
class Person {
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
  sayHello(){}
}
  
class Student extends Person{
  constructor(name, age, gender, score){
    super(name, age);
    this.gender = gender;
    this.score = score;
  }
}
```



**TypeScript中的继承**

和 ES6 是一样的，通过 extends 来实现继承

```ts
class Person {
  private _name: string;
  private _age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  sayHello() {
    console.log(
      `Hello, my name is ${this._name} and I am ${this._age} years old`
    );
  }

  get name() {
    return this._name;
  }
}

class Student extends Person {
  private _gender: string;
  private _score: number;

  constructor(name: string, age: number, gender: string, score: number) {
    super(name, age);
    this._gender = gender;
    this._score = score;
  }

  sayScore() {
    console.log(`My score is ${this._score}`);
  }
}

const zhangsan = new Student("张三", 18, "男", 100);
zhangsan.sayHello();
zhangsan.sayScore();
console.log(zhangsan.name);

```



## 多态

面向对象编程（OOP）中的多态性（Polymorphism）是指允许不同类的对象对<u>同一消息</u>做出响应的能力，即**<u>同一个接口可以被不同的对象以不同的方式实现。</u>**多态的存在使得对象可以在内部实现细节的不同的情况下共享外部接口。

多态分几种类型，最常见的是通过继承实现的子类多态，其中子类需要去重新父类的方法，从而实现相同的接口不同的行为。



**JavaScript中的多态**

由于 JS 是弱类型语言，因此 JS 被认为天生就是多态的：

```js
const dog = {
  name: "doggie",
  age: 3,
  sayHello(){
    console.log("Hello, I'm a dog");
  }
}

const cat = {
  name: "mongo",
  age: 3,
  sayHello(){
    console.log("Hello, I'm a cat");
  }
}

const obj = {
  sayHello(){}
}

function playSound(animal){
  animal.sayHello();
}

playSound(dog);
playSound(cat);
```

以 Java 为例，因为这样的语言是静态类型语言，存在类型，所以这种语言往往必须子类继承父类，然后改写父类的方法，从而实现继承

```java
class Animal {
  public String name;
  public int age;
  
  public Animal(String name, int age){
    this.name = name;
    this.age = age;
  }
  
  public void sayHello{}
}

class Dog extends Animal {
  public Dog(String name, int age){
    super(name, age);
  }
  public void sayHello{
    System.out.println("Hello, I'm a dog")
  }
}

class Cat extends Animal{
  public Cat(String name, int age){
    super(name, age);
  }
  public void sayHello{
    System.out.println("Hello, I'm a cat")
  }
}

public static void playSound(Animal animal){
  animal.sayHello();
}

playSound(dog);
playSound(cat);
```



**TypeScript中的多态**

TypeScript 虽然有了类型的加持，但是 TypeScript 采用的是鸭子类型（Duck Typing）

什么是鸭子类型？

>*When I see a bird that walks like a duck and swims like a duck and quacks like a duck, I call that bird a duck.*
>如果一只鸟走起路来像鸭子，游泳像鸭子，叫起来也像鸭子，那它就可以叫做鸭子。
>—— *James Whitcomb Riley,1849 - 1916*
>
>举个例子，判断一个对象是不是 *X* 类型，只要检查它是否具有 *X* 的特定属性或者方法，如果有，即可把它当成 *X* 类型的对象。
>
>我们可以通过一个小故事来更深刻地了解鸭子类型：
>
>从前在 *JavaScript* 王国里，有一个国王，他觉得世界上最美妙的声音就是鸭子的叫声，于是国王召集大臣，要组建一个 *1000* 只鸭子组成的合唱团。
>
>大臣们找遍了全国，终于找到 *999* 只鸭子，但是始终还差一只，最后大臣发现有一只非常特别的鸡，它的叫声跟鸭子一模一样，于是这只鸡就成为了合唱团的最后一员。
>
><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-19-083912.jpg" alt="15746846764503" style="zoom:40%;" />
>
>这个故事告诉我们，国王要听的只是鸭子的叫声，这个声音的主人到底是鸡还是鸭并不重要。**<u>鸭子类型指导我们只关注对象的行为，而不关注对象本身。</u>**

只要一个对象的结构和特定的接口相匹配，也就是有相同的属性和方法，那么在 TS 中就会认为该对象实现了这个接口，无论它们的实际类型是否显式声明为该接口类型。

```ts
class Animal {
  public sayHello(): void {
    console.log("Some animal sound");
  }
}

class Dog extends Animal {
  public sayHello(): void {
    console.log("Bark");
  }
}

class Cat extends Animal {
  public sayHello(): void {
    console.log("Meow");
  }
}

const obj = {
  sayHello() {
    console.log("Hello");
  },
};

function playSound(animal: Animal) {
  animal.sayHello();
}

const dog = new Dog();
const cat = new Cat();
playSound(dog);
playSound(cat);
playSound(obj);
```

