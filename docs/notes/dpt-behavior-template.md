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
title: 模板模式
order: 23
---

# 模板模式

模板模式的定义：

> 模板模式是一种行为设计模式，这种模式会在超类中去定义一个算法的框架（步骤），然后子类会在不修改结构的情况下重写算法的特定步骤。

整个模板模式，是由两个部分组成的：

- 抽象的父类：封装子类的算法框架，包括实现一些公共的方法以及子类中所有方法的执行顺序。
- 各个子类：会继承这个抽象类，也就继承了整个算法的结构，子类会针对这个结构里面的部分算法进行一个重写。

模板模式在我们的现实生活中也是比比皆是，例如建造房子，每一个房屋的成品都有一些共同的步骤：

- 打地基
- 建造房屋的框架
- 建造墙壁
- 安装水电管线
- ....

虽然大体的步骤是相同的，但是不同的房屋，每一个步骤会有所区别：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-28-033254.png" alt="image-20240328113253987" style="zoom:50%;" />

因此我们可以先去制定一套标准的房屋建造方案，确定整体的建造步骤，然后在建造不同的房屋的时候，部分建造步骤进行微调，从而满足不同客户的需求。



## 类结构图

模板模式的类结构图如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-28-025034.png" alt="image-20240328105034410" style="zoom:70%;" />

1. 抽象类：在抽象的父类中，去定义算法的步骤。
2. 具体的子类：可以重写某一个步骤方法的具体实现，但是整个步骤的顺序是和父类所定义的顺序是一致的。



## 代码实现

这里以非常经典的咖啡与茶的例子来进行讲解，这个例子出自于《Head First 设计模式》。

**冲泡咖啡**

大致的步骤如下：

1. 把水烧开
2. 用开水冲泡咖啡
3. 把咖啡倒进杯子
4. 加糖和牛奶

```ts
export class Coffee {
  constructor() {}

  boildWater(): void {
    console.log("把水烧开");
  }

  brewCoffeeGriends(): void {
    console.log("用沸水冲泡咖啡");
  }

  pourInCup(): void {
    console.log("把咖啡倒进杯子");
  }

  addSugarAndMilk(): void {
    console.log("加糖和牛奶");
  }

  init(): void {
    this.boildWater();
    this.brewCoffeeGriends();
    this.pourInCup();
    this.addSugarAndMilk();
  }
}
```



**泡一壶茶**

这个步骤基本上是和冲泡咖啡的步骤是差不多的：

1. 把水烧开
2. 用沸水侵泡茶叶
3. 把茶水倒进杯子
4. 加柠檬

具体的代码如下：

```ts
export class Tea {
  constructor() {}

  boildWater(): void {
    console.log("把水烧开");
  }

  steepTeaBag(): void {
    console.log("用沸水浸泡茶叶");
  }

  pourInCup(): void {
    console.log("把茶倒进杯子");
  }

  addLemon(): void {
    console.log("加柠檬");
  }

  // init 主要是调用上述方法的顺序
  init(): void {
    this.boildWater();
    this.steepTeaBag();
    this.pourInCup();
    this.addLemon();
  }
}
```

经过分析，我们会发现冲泡咖啡和泡茶的整体步骤是大同小异的，因此我们这里可以将共同点进行一个分离：

| 泡咖啡         | 泡茶           |
| -------------- | -------------- |
| 把水煮沸       | 把水煮沸       |
| 用沸水冲泡咖啡 | 用沸水侵泡茶叶 |
| 把咖啡倒进杯子 | 把茶水倒进杯子 |
| 加糖和牛奶     | 加柠檬         |

两个操作具体的不同点：

- 原料不同：一个是咖啡，一个是茶。我们这里就可以进行一层抽象，统一抽象为“饮料”。
- 泡的方式不同：咖啡是冲泡，茶叶是侵泡，这里统一抽象为“泡”。
- 加入的调料不同：咖啡加入的是糖和牛奶，而茶加入的是柠檬，这里统一抽象为“调料”

接下来我们无论是冲泡咖啡还是泡茶，我们都可以抽象为统一的四个步骤：

1. 把水煮沸
2. 用沸水冲泡饮料
3. 把饮料倒进杯子
4. 加调料

接下来我们这里所分析出来的四个步骤，就可以提取到抽象类里面

```ts
// 定义一个抽象类，来统一冲泡饮料的步骤
export abstract class Beverage {
  // 1. 烧水，因为无论是冲泡咖啡还是茶，烧水的实现都是相同
  // 因此这个方法的具体实现就可以写在父类里面
  boildWater() {
    console.log("把水烧开");
  }

  abstract brew(): void; // 2. 泡饮料，因为冲泡的方式不同，所以交给子类去实现
  abstract pourInCup(): void; // 3. 把饮料倒进杯子，因为倒的是不同的饮料，所以交给子类去实现
  abstract addCondiments(): void; // 4. 加调料，因为调料不同，所以交给子类去实现

  // 5. 模板方法，控制泡饮料的流程（重要）
  init(): void {
    this.boildWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }
}
```

在这个抽象父类中，如果是子类共同的实现的方法，直接写在抽象类里面，如果是子类有不同实现的方法，在抽象类中写成抽象方法，交给子类来书写具体实现。

在抽象父类中，有一个非常**关键的就是定义方法的执行顺序**。



## 钩子方法

在抽象类中，定义了整个算法的执行流程。

子类虽然针对个别方法有不同的实现，但是整体的流程是遵循父类所定义的流程来执行的。

但是，有些时候某些子类可以会存在个别步骤不需要执行的情况，这个时候我们就需要钩子方法。

刚才我们在 Beverage 抽象父类里面封装了 4 个步骤：

1. 把水煮沸
2. 用沸水冲泡饮料
3. 把饮料倒进杯子
4. 加调料

但是可能存在一些顾客喝咖啡的时候不加调料，因此我们需要针对特定的步骤设置挂钩，回头子类可以自行决定这个步骤是否执行。

首先是父类，需要添加钩子方法：

```ts
// 定义一个抽象类，来统一冲泡饮料的步骤
export abstract class Beverage {
  // 1. 烧水，因为无论是冲泡咖啡还是茶，烧水的实现都是相同
  // 因此这个方法的具体实现就可以写在父类里面
  boildWater() {
    console.log("把水烧开");
  }

  abstract brew(): void; // 2. 泡饮料，因为冲泡的方式不同，所以交给子类去实现
  abstract pourInCup(): void; // 3. 把饮料倒进杯子，因为倒的是不同的饮料，所以交给子类去实现
  abstract addCondiments(): void; // 4. 加调料，因为调料不同，所以交给子类去实现

  // 5. 模板方法，控制泡饮料的流程（重要）
  init(): void {
    this.boildWater();
    this.brew();
    this.pourInCup();
    // 这里第 4 个步骤是一个钩子，子类可以选择是否覆盖这个方法
    if (this.customerWantsCondiments()) {
      // 只有在 customerWantsCondiments 这个方法返回 true 的时候，才会执行步骤 4 
      this.addCondiments();
    }
  }

  // 顾客是否需要调料，子类可以覆盖这个方法，来决定是否需要调料
  customerWantsCondiments(): boolean {
    return true;
  }
}
```

接下来是子类，子类要做的就是重写钩子方法：

```ts
import { Beverage } from "./Beverage";
export class Coffee extends Beverage {
  constructor() {
    super();
  }

  //   boildWater(): void {
  //     console.log("把水烧开");
  //   }

  brew(): void {
    console.log("用沸水冲泡咖啡");
  }

  pourInCup(): void {
    console.log("把咖啡倒进杯子");
  }

  addCondiments(): void {
    console.log("加糖和牛奶");
  }

  customerWantsCondiments(): boolean {
    // 根据用户的输入来决定是否添加调料
    // return window.confirm("请问需要加糖和牛奶吗？");
    return false;
  }

  //   init(): void {
  //     this.boildWater();
  //     this.brewCoffeeGriends();
  //     this.pourInCup();
  //     this.addSugarAndMilk();
  //   }
}
```

