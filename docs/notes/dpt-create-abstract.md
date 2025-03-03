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
title: 抽象工厂模式
order: 16
---

# 抽象工厂模式

抽象工厂模式定义：

> 能够创建一系列的相关对象，而无需指定具体的类。

在前面所介绍的标准的工厂模式中，每一个产品，就会对应一个工厂。

但是这种设计会存在这么一个问题：

> 每增加一个产品，就需要增加一个工厂，当我们的产品的数量很多的时候，就会使得工厂的数量也成倍的增加。

抽象工厂模式就是解决上述问题的。

在抽象工厂模式中，会有一个产品族的概念，一个产品族（一个系列）会对应一组产品，之后一个工厂在生产的时候，是生产这一组产品，而非单个的某个产品。



## 场景示例

例如，假设我们有一个家具店，产品包括椅子、沙发、咖啡桌等。这些产品可以根据风格（现代、维多利亚、装饰艺术等）来分类。现代风格的椅子、沙发和咖啡桌可以构成一个产品族，维多利亚风格的椅子、沙发和咖啡桌构成另一个产品族。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-25-061344.png" alt="image-20240325141343917" style="zoom:70%;" />

如果按照上一节课所介绍的工厂方法模式，那么这里家具的种类和风格的种类一组合，就会有 9 个工厂，这个在设计上面肯定是不太合理的。

在这里，当客户想要订购一套现代风的家具的时候，直接通过现代风家具工厂就能够得到该风格的一整套家具，而非某一个单独的家具。



## 对应类图

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-25-060347.png" alt="image-20240325140346976" style="zoom:70%;" />

1. 抽象产品或者产品接口：对不同的产品进行约束
2. 具体的产品：具体的产品会继承抽象类或者实现对应的抽象接口。
3. 抽象工厂或者工厂接口：对不同的工厂进行约束。
4. 具体的工厂：具体的工厂可以继承抽象工厂或者实现工厂接口
5. 客户端通过某一个具体的工厂，来生产一系列的对象



抽象工厂模式对应的代码请参阅随堂课堂代码。



## 前端中抽象工厂的应用

抽象工厂模式虽然应用场景较少，但是并不是说完全没有，有一些场景也非常适合使用抽象工厂模式。

例如你需要创建一种具有共同主题或者行为的组件的时候。

```ts
// 抽象工厂
class UIComponentFactory {
  createButton() {}
  createInput() {}
}

// 具体工厂
// 负责生产 Material 风格的组件
class MaterialUIComponentFactory extends UIComponentFactory {
  createButton() {
    return new MaterialButton();
  }
  
  createInput() {
    return new MaterialInput();
  }
}

// 具体工厂
// 负责生产 AntDesign 风格的组件
class AntDesignUIComponentFactory extends UIComponentFactory {
  createButton() {
    return new AntDesignButton();
  }
  
  createInput() {
    return new AntDesignInput();
  }
}

// 抽象产品
abstract class Button {}
abstract class Input {}

// 具体产品
class MaterialButton extends Button {}
class MaterialInput extends Input {}

class AntDesignButton extends Button {}
class AntDesignInput extends Input {}

// 使用
// 通过 materialFactory 就可以生产一套 material 风格的组件
const materialFactory = new MaterialUIComponentFactory();
const materialButton = materialFactory.createButton();
const materialInput = materialFactory.createInput();

// 通过 antDesignFactory 就可以生产一套 antDesign 风格的组件
const antDesignFactory = new AntDesignUIComponentFactory();
const antDesignButton = antDesignFactory.createButton();
const antDesignInput = antDesignFactory.createInput();
```



