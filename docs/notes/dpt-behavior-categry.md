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
title: 策略模式
order: 24
---


# 策略模式

策略模式定义：

> 策略模式定义了一系列的算法，并且会将每一个算法封装起来，让它们可以相互的替换。



## 场景举例

小明打算去机场，去机场的方式有很多：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-23-071106.png" alt="image-20240323151103310" style="zoom:50%;" />

小明出行的代码示例：

```ts
type TravelWay = "bus" | "didi" | "sharedBicycle";

class TrafficFeeCalculator {
  public goToAirport(way: TravelWay, distance: number): number {
    let trafficFee = 0;
    switch (way) {
      case "bus":
        if (distance < 10) trafficFee = 4;
        else trafficFee = 6;
        break;
      case "didi":
        if (distance < 3) trafficFee = 8;
        else trafficFee = 8 + (distance - 3) * 3;
        break;
      case "sharedBicycle":
        trafficFee = 2;
        break;
      default:
        break;
    }
    return trafficFee;
  }
}

// 使用示例
const calculator = new TrafficFeeCalculator();
console.log(calculator.goToAirport("bus", 5)); // 4
console.log(calculator.goToAirport("didi", 10)); // 29
console.log(calculator.goToAirport("sharedBicycle", 0)); // 2
```

上面的代码能够正常工作，但是从设计上来讲，存在一些问题：

- 每一种交通出行的花费计算方式都写在了 TrafficFeeCalculator 类里面，这个类自身所承担的职责就比较多，违背了设计原则里面的单一职责。
- 假如现在我们需要新增两种交通出行方式，那么上面的设计必然会导致 goToAirport 方法的修改，这里就会违反了设计原则里面的开闭原则。

其实之所以会遇到上面的问题，根本原因就一个： **<u>算法的实现和算法的使用耦合到一起了。</u>**

而策略模式的根本就是要将这两者进行一个分离。



## 具体类图

策略模式对应的类图如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-23-071811.png" alt="image-20240323151811606" style="zoom:70%;" />

1. 上下文：上下文内部维护了具体策略的引用，也就是说，在上下文里面来选择具体的执行策略。
2. 策略接口：定义了所有的策略需要实现的方法接口，相当于是给所有的策略一个约束。
3. 具体策略：每一种策略需要实现策略接口。
4. 当上下文需要运行算法的时候，会根据已经选择的策略，执行接口所约束的方法。
5. 客户端代码，创建一个具体的策略实例，传递给上下文，让上下文来锁定具体的策略。



## 具体的代码

首先定义策略相关的接口：

```ts
// 策略接口
export interface IStrategy {
  execute(a: number, b: number): number;
}
```

接下来是具体的策略，每一种策略都需要实现策略接口：

```ts
// 定义具体的策略类
import { IStrategy } from "./Interface";

// 这里定义了四个具体的策略类，分别是加法、减法、乘法和除法
export class AddStrategy implements IStrategy {
  execute(a: number, b: number): number {
    return a + b;
  }
}

export class SubStrategy implements IStrategy {
  execute(a: number, b: number): number {
    return a - b;
  }
}

export class MulStrategy implements IStrategy {
  execute(a: number, b: number): number {
    return a * b;
  }
}

export class DivStrategy implements IStrategy {
  execute(a: number, b: number): number {
    return a / b;
  }
}
```

接下来我们需要一个中间层 Context，这一层负责设置具体的策略，以及执行对应的策略方法。

```ts
// 上下文内部维护了具体的策略的引用
// 回头客户端调用的时候，只需要调用上下文的方法即可
import { IStrategy } from "./Interface";

export default class Context {
  // 维护具体的策略
  private strategy: IStrategy;

  constructor(st: IStrategy) {
    this.strategy = st;
  }

  // 设置新的策略
  setStrategy(st: IStrategy) {
    this.strategy = st;
  }

  // 执行策略的方法
  executeStrategy(a: number, b: number): number {
    return this.strategy.execute(a, b);
  }
}
```

最后是客户端，在客户端选择了对应的策略，之后要执行策略方法的时候是直接和 Context 进行交互，调用 Context 的相关方法，这样的话避免客户端和具体策略之间的耦合，Context 在两者之间起到了一个解耦的效果。

```ts
import Context from "./Context";
import { AddStrategy, SubStrategy } from "./Strategy";

// 创建一个上下文对象
// 在创建的时候，传递一个默认的执行策略
const context = new Context(new AddStrategy());


const action = getAction(); // 这里的 getAction 是一个模拟的函数，用来模拟用户选择的策略
function getAction() {
  return "sub";
}

// 设置策略
// 根据用户选择的策略，设置不同的策略
switch (action) {
  case "add":
    context.setStrategy(new AddStrategy());
    break;
  case "sub":
    context.setStrategy(new SubStrategy());
    break;
  default:
    break;
}

// 执行对应的策略
const a = 10;
const b = 5;
const result = context.executeStrategy(a, b);
console.log(result);
```



**解决小明出行问题**

详细参阅随堂的课堂代码。



## 前端开发中策略模式的应用

在前端开发中，不仅有用到策略模式，而且使用的场景还挺多的：

- **表单验证**： 在表单验证中，根据不同的验证规则（如邮箱验证、密码强度验证、电话号码验证等）应用不同的验证策略。使用策略模式，可以轻松添加新的验证规则或更改现有规则，而不影响其他的验证逻辑。
- **主题切换**： 用户可能希望在不同的主题风格之间切换，策略模式可以帮助管理不同的样式策略。
- **模块加载**： 根据环境或配置，决定使用哪种模块加载策略，如懒加载、预加载或同步加载。
- **国际化和本地化**： 应用可能需要支持多种语言，策略模式可以根据用户的语言偏好来选择相应的语言包。
- **缓存策略**： 对于数据缓存，可能会有多种策略，如内存缓存、localStorage、indexedDB或Service Workers。
- ....



这里来看一个表单验证的具体示例（以 ElementUI 为例）

首先是定义不同的验证规则，这些不同的验证规则其实就是你的验证策略：

```js
/* 姓名校验 由2-10位汉字组成 */
export function validateUsername(str) {
    const reg = /^[\u4e00-\u9fa5]{2,10}$/
    return reg.test(str)
}

/* 手机号校验 由以1开头的11位数字组成  */
export function validateMobile(str) {
    const reg = /^1\d{10}$/
    return reg.test(str)
}

/* 邮箱校验 */
export function validateEmail(str) {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return reg.test(str)
}
```

之后我们会书写一个类似于 Context 的中间层：

- 选择具体的验证策略
- 对客户端提供统一的接口

```js
import * as Validates from './validates.js'

/* 生成表格自定义校验函数 */
export const formValidateGene = (key, msg) => (rule, value, cb) => {
    if (Validates[key](value)) {
        cb()
    } else {
        cb(new Error(msg))
    }
}
```

最后在客户端要进行表单验证的时候，只需要传递不同的验证策略即可：

```vue
<template>
  <el-form
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
    :rules="rules"
    :model="ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>

    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="ruleForm.mobile"></el-input>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
  </el-form>
</template>

<script type="text/javascript">
import * as Utils from "../utils";

export default {
  name: "ElTableDemo",
  data() {
    return {
      ruleForm: { pass: "", checkPass: "", age: "" },
      rules: {
        username: [
          {
            validator: Utils.formValidateGene(
              "validateUsername",
              "姓名由2-10位汉字组成"
            ),
            trigger: "blur",
          },
        ],
        mobile: [
          {
            validator: Utils.formValidateGene(
              "validateMobile",
              "手机号由以1开头的11位数字组成"
            ),
            trigger: "blur",
          },
        ],
        email: [
          {
            validator: Utils.formValidateGene(
              "validateEmail",
              "不是正确的邮箱格式"
            ),
            trigger: "blur",
          },
        ],
      },
    };
  },
};
</script>
```

