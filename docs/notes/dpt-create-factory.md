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
title: 简单工厂模式
order: 14
---

# 简单工厂模式

工厂模式同样是属于创建型模式的一种。

定义：

> 在创建对象的时候，不会对客户端暴露具体的创建逻辑，通过工厂所提供的一个统一的接口来得到对象。

在工厂模式里面，主要涉及到两个概念（角色）：

- 工厂：该角色负责创建具体的对象，对外部隐藏了具体的创建逻辑
- 产品：通过调用工厂给客户端提供的接口，所得到的对象

整个工厂模式有三种变体：

- 简单工厂模式
- 工厂方法模式
- 抽象工厂模式



## 具体代码

首先针对产品，书写一个统一的接口

```ts
// 定义产品的接口
export interface IProduct {
  use(): void;
}
```

接下来是具体的产品类，每一个产品类会去实现产品接口

```ts
// 一个具体的产品

import { IProduct } from "./Interface";

export class ProductA implements IProduct {
  use() {
    console.log("ProductA is used");
  }
}
```

```ts
// 一个具体的产品

import { IProduct } from "./Interface";

export class ProductB implements IProduct {
  use() {
    console.log("ProductB is used");
  }
}
```

接下来需要有一个工厂类，这个工厂类提供了一个统一的调用方法 createProduct，回头客户端通过调用该方法来创建不同的产品

```ts
import { IProduct } from "./Interface";
import { ProductA } from "./productA";
import { ProductB } from "./productB";

export class SimpleFactory {
  static createProduct(type: string): IProduct {
    switch (type) {
      case "A":
        return new ProductA();
      case "B":
        return new ProductB();
      default:
        throw new Error("No such product");
    }
  }
}

```

最后是客户端测试代码：

```ts
// 得到具体的产品
// 不需要引入具体的产品类
// 而是通过工厂类来创建具体的产品

import { SimpleFactory } from "./SimpleFactory";

const productA = SimpleFactory.createProduct("A");
const productB = SimpleFactory.createProduct("B");

productA.use();
productB.use();
```



## 贪吃蛇使用示例

例如下面的代码是贪吃蛇游戏中的简单工厂模式的一个实践：

```js
class SquareFactory {
    Floor(x, y, color) {
        const floor = new Floor(x, y, squareWidth, squareWidth); // 实例化 Floor 对象
        this.init(floor, color, collideType.move); // 设置该 DOM 元素的 CSS 信息
        return floor; // 返回该对象
    }

    Wall(x, y, color) {
        const wall = new Wall(x, y, squareWidth, squareWidth); // 实例化 Wall 对象
        this.init(wall, color, collideType.die); // 设置该 DOM 元素的 CSS 信息
        return wall; // 返回该对象
    }

    SnakeHead(x, y, color) {
        const snakeHead = new SnakeHead(x, y, squareWidth, squareWidth); // 实例化 SnakeHead 对象
        this.init(snakeHead, color, collideType.die); // 设置该 DOM 元素的 CSS 信息

        // 由于蛇头是单例模式，只会有一个蛇头，所以我们需要更新蛇头的 x、y 坐标，而不是新创建一个
        snakeHead.update(x, y);

        return snakeHead; // 返回该对象
    }

    SnakeBody(x, y, color) {
        const snakeBody = new SnakeBody(x, y, squareWidth, squareWidth); // 实例化 SnakeBody 对象
        this.init(snakeBody, color, collideType.die); // 设置该 DOM 元素的 CSS 信息
        return snakeBody; // 返回该对象
    }

    Food(x, y, color) {
        const food = new Food(x, y, squareWidth, squareWidth); // 实例化 Food 对象
        this.init(food, color, collideType.eat); // 设置该 DOM 元素的 CSS 信息

        // 由于食物是单例模式，只会有一个食物，所以我们需要更新食物的 x、y 坐标，而不是新创建一个
        food.update(x, y);

        return food; // 返回该对象
    }

    init(square, color, action) {
        square.viewContent.style.position = "absolute";
        square.viewContent.style.width = square.width + "px";
        square.viewContent.style.height = square.height + "px";
        square.viewContent.style.background = color;
        /*
            让 x 代表列，y 代表行
            left = 列(x)*宽度;
            top = 行(y)*高度; 
         */
        square.viewContent.style.left = square.x * squareWidth + "px";
        square.viewContent.style.top = square.y * squareWidth + "px";

        square.collide = action;  //给方块身上打上标签
    }

    static create(type, x, y, color) {
        // 预警处理，如果传递过来的 type 类型不存在，抛出一个错误
        if (!SquareFactory.prototype[type]) {
            throw new Error('no this type');
        }

        // 创建一个工厂实例，然后调用工厂对应的流水线方法
        return new SquareFactory()[type](x, y, color);
    }
}
```

在上面的 SquareFactory 工厂中，提供了一个 create 方法来生产各种类型的小方块。

回头外部就通过调用这个 create 方法来得到不同类型的小方块。

```js
const newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'grey'); 
const newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');
const snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'deeppink');
const food = SquareFactory.create('Food', x, y, 'red');
const wall = SquareFactory.create("Wall", x, y, "black");
```



