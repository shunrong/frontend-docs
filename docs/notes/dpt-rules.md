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
title: 设计原则
order: 5
---

# 设计原则

在正式开始学习具体的设计模式之前，我们还需要了解一个东西，那就是设计原则。

这里会介绍这两个知识：

- 优秀设计特征
- 设计原则



## 优秀设计特征

先来看一下优秀的软件设计，都会有一些共同的设计特征。

### 1. 代码复用

无论是开发何种软件产品，<u>成本</u>和<u>时间</u>都最重要的两个维度：

- 较短的开发时间意味着可比竞争对手更早进入市场
- 较低的开发成本意味着能够留出更多营销资金，因此能更广泛地覆盖潜在客户。

代码复用是减少开发成本时最常用的方式之一。其意图非常明显：<u>与其反复从头开发，不如尽可能的重用已有代码</u>。

代码复用具体带来的好处如下：

**提高软件质量**

通过复用经过<u>测试</u>和<u>验证</u>的代码，可以显著提高软件的整体质量。已有的代码库往往经过了多次使用和迭代，这意味着它们更不可能包含严重的错误或漏洞。此外，当发现问题或需要更新时，只需在一个地方修改代码，就可以在所有使用了该代码的地方反映出这些更改，从而确保了软件产品的一致性和可靠性。

**加快开发速度**

代码复用可以显著加快开发速度。开发人员可以利用现有的功能模块作为构建新应用或功能的基础，避免了重复的工作和资源浪费。这样，他们可以将更多的时间和精力集中在新增功能的创新和实现上，<u>而不是重新发明轮子</u>。

**促进模块化和解耦**

良好的代码复用策略鼓励开发者编写模块化和解耦的代码。通过将代码组织成独立、可重用的模块，开发者可以更容易地理解、测试和维护代码。这种模块化的方法还促进了更清晰的架构设计，使得软件系统更加灵活，适应未来需求的变化。



代码复用的示例：

- 函数
- 类
- 模块
- 组件
- 库
- 框架
- ....



### 2. 扩展性

<u>变化是程序员生命中唯一不变的事情</u>。

- 你在 Windows 平台上发布了一款游戏， 但现在人们想要 macOS 的版本。
- 你创建了一个使用方形按钮的 GUI 框架，但几个月后圆形按钮开始流行起来。
- 你设计了一款优秀的电子商务网站构架， 但仅仅几个月后，客户就要求新增接受电话订单的功能。

当我们开发一个软件的时候，不可能在一开始就想到所有的场景，罗列出完备的需求。

因此，这就要求我们的程序是具备可扩展性（Scalability）的。

<u>扩展性是衡量软件设计优良与否的重要指标之一</u>，当软件的需求增加或变化时，拥有扩展性意味着能够更加容易地添加新功能或增强现有功能，而不需要对现有代码进行大规模的重构。

**实现扩展性的策略**

- 遵循设计原则：如SOLID原则，特别是开放封闭原则（Open-Closed Principle），它鼓励我们设计模块时应该是<u>对扩展开放的，而对修改封闭的</u>。这意味着在不修改现有代码的情况下，可以通过添加新代码来扩展软件的功能。

- 预留扩展点：在设计软件时，通过预留扩展点（如插件系统、钩子或回调函数）允许未来的开发者在不直接修改核心代码的情况下，增加新的功能或者修改行为。这里举一个回调函数的例子：

  ```js
  function fetchUserData(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // 当请求成功完成时，解析响应数据
        const responseData = JSON.parse(xhr.responseText);
        
        // 调用回调函数处理响应数据
        if (typeof callback === "function") {
          callback(responseData);
        }
      }
    };
    
    xhr.send();
  }
  
  // 定义一个回调函数来处理获取到的用户数据
  function handleUserData(data) {
    console.log("Received user data:", data);
    // 在这里可以添加更多对数据的处理逻辑
  }
  
  // 调用 fetchUserData 函数，传入URL和处理响应的回调函数
  const url = "https://example.com/api/user";
  fetchUserData(url, handleUserData);
  ```

  很明显，这里在设计 fetchUserData 函数的时候，callback 就是一个扩展点，允许用户传递自己的逻辑，但是整个 fetchUserData 函数内部的逻辑是不变的。

- 采用模块化和微服务架构：将应用分解为一组小的、松散耦合的模块或服务，每个都有明确的责任。这样，当需求变化或需要添加新功能时，只需修改或添加相关的模块或服务，而不会影响到整个系统。



## 设计原则

了解了优秀软件的设计特征后，接下来我们来看一下符合这些设计特征的设计原则。

### 封装变化的内容

其核心在于：

>找到程序中的<u>变化内容</u>并将其与<u>不变的内容</u>区分开。

该原则的主要目的是将变更造成的影响最小化。可以<u>将变化部分放入独立的模块中</u>，保护其他代码不受负面影响。

#### 1. 方法层面的封装

假如你正在开发一个电子商务网站。 代码中某处有一个 getOrderTotal 获取订单总额方法， 用于计算订单的总价（包括税金在内），税率会根据客户居住的国家/地区、州/省甚至城市而有所不同。

你写出来的代码可能是这样的：

```ts
type LineItem = {
  price: number;
  quantity: number;
};

type Order = {
  lineItems: LineItem[];
  country: string;
};

// 该方法用于计算订单的总额
function getOrderTotal(order: Order): number {
  let total = 0;

  // 计算订单项总价
  order.lineItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  // 根据国家应用税率
  // 这里会根据不同的国家，不同的税率去计算总价
  // 但是税率是可能发生变化的，属于上面所提到的“变化的部分”
  // 只要税率一变，就会涉及到修改 getOrderTotal 这个方法的内部实现
  if (order.country === "US") {
    total += total * 0.07; // 美国营业税
  } else if (order.country === "EU") {
    total += total * 0.2; // 欧洲增值税
  }

  return total;
}
```

我们预计在未来可能会修改与税金相关的代码，而且一段时间后，实际的计算公式可能会由于新的法律或规定而修改。因此，你将需要经常性地修改 getOrderTotal 方法。

那么此时，可以有一种更好的方式，那就是将<u>计算税金的逻辑（封装变化的内容）抽取到一个单独的方法中，并对原始方法隐藏该逻辑</u>，例如：

```ts
type LineItem = {
  price: number;
  quantity: number;
};

type Order = {
  lineItems: LineItem[];
  country: string;
};

function getOrderTotal(order: Order): number {
  let total = 0;

  // 计算订单项总价
  order.lineItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  // 应用税率
  const taxRate = getTaxRate(order.country);
  total += total * taxRate;

  return total;
}

// 单独的函数用于获取税率
function getTaxRate(country: string): number {
  if (country === "US") {
    return 0.07; // 美国营业税
  } else if (country === "EU") {
    return 0.2; // 欧洲增值税
  } else {
    return 0; // 其他国家无税
  }
}
```

在这个优化后的版本中，我们新增了一个 getTaxRate 函数，该函数根据不同的国家返回不同税率。这样做的好处在于，如果税率发生变化，我们只需要修改 getTaxRate 函数即可，getOrderTotal 函数的逻辑是不变的。

#### 2. 类层面封装

当我们的职责越来越多，那么可以会写更多的方法，此时我们可能会想到用一个类来进行封装，就像这样：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-22-050159.png" alt="image-20240322130159055" style="zoom:50%;" />

但是这样的类封装，<u>存在一个问题，那就是订单和税金耦合到了一起</u>，因此我们应该封装一个和税金相关的类，将订单类所有与税金相关的工作委派给税金类。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-22-051020.png" alt="image-20240322131019626" style="zoom:50%;" />

修改了类的设计之后，对于订单类来讲，隐藏了税金计算的具体逻辑，它其实也不需要知道税金计算的具体逻辑，这其实就是后面要介绍的最小知识原则。



### 面向接口进行开发

这条原则的完整表述为：

>面向接口进行开发，而不是面向实现；依赖于抽象类型，而不是具体类。

面向接口开发的好处在于，无需修改已有代码就能轻松对类进行扩展，这样的设计是非常灵活的。

举一个例子，假设有一个猫类，猫要吃香肠，所以猫类依赖一个香肠类，画出来的类图差不多就是这样：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-22-052059.png" alt="image-20240322132058817" style="zoom:50%;" />

可以看到，在 Cat 类中，有一个 eat 方法，依赖 Sausage 类。这样的设计非常死板，因为假设现在猫不吃香肠，要吃小鱼干，那么意味着你是需要去变动 Cat 类里面的 eat 方法的。

一种更好的设计，则是设计一个中间层 Food 的接口，让 Cat 去依赖这个中间层，之后任何事物只需要去实现这个接口即可。

具体的设计步骤如下：

1. 确定一个对象对另一对象的确切需求：它需执行哪些方法？
2. 在一个新的接口或抽象类中描述这些方法。
3. 让被依赖的类实现该接口。
4. 现在让有需求的类依赖于这个接口， 而不依赖于具体的类。你仍可与原始类中的对象进行互动，但现在其连接将会灵活得多。

画出来的类图如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-22-052441.png" alt="image-20240322132441201" style="zoom:50%;" />

可以看到，优化之后，虽然代码变得更加复杂了，多了一个中间层，但是现在在进行扩展的时候，代码就变得更加灵活了。我们不再需要去修改 Cat 类的任何代码，要添加一个小鱼干？只需要让小鱼干类去实现 Food 接口即可。



### 组合优于继承

继承可能是类之间最明显、最简便的代码复用方式。如果你有两个代码相同的类， 就可以为它们创建一个通用的基类，然后将相似的代码移动到其中。轻而易举！

不过，继承同样也会带来一些问题：

- **子类不能减少超类的接口**。你必须实现父类中所有的抽象方法，即使它们没什么用。
- **子类与超类紧密耦合**。超类中的任何修改都可能会破坏子类的功能。
- **在重写方法时，你需要确保新行为与其基类中的版本兼容**。这一点很重要，因为子类的所有对象都可能被传递给以超类对象为参数的任何代码，所以方法签名以及行为必须保证相同。
- **大猩猩与香蕉问题**。这意味着为了获得一个小的功能或属性（香蕉），你不得不继承一个包含了许多不需要功能或属性的大类（大猩猩），甚至是整个类的层次结构（丛林）。

组合是代替继承的一种方法。

<u>继承代表类之间的“是”关系（汽车**是**交通工具），而组合则代表“有”关系（汽车**有**一个引擎）</u>，这其实也就是前面所讲的抽象类和接口背后所代表的不同含义。

来看一个例子：假如你需要为汽车制造商创建一个目录程序。 该公司同时生产汽车 Car 和卡车 Truck ， 车辆可能是电动车 Electric 或汽油车 Combustion；所有车型都配备了手动控制 manual control 或自动驾驶 Autopilot 功能。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-22-053839.png" alt="image-20240322133838933" style="zoom:50%;" />

正如你所看到的，每个额外参数都将使子类数量倍增。子类中将有大量的重复代码，因为子类不能同时继承两个类。

此时我们可以使用组合来解决这个问题。汽车对象可将行为委派给其他对象，而不是自行实现。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-22-054119.png" alt="image-20240322134117774" style="zoom:50%;" />

可以看到，<u>组合相比继承的方式来讲，会更加灵活</u>，就拿 Driver 接口来讲，里面有一个 navigate 方法，之后有对这个 navigate 方法有需求的类，我们只需要让这个类去实现 Driver 接口即可，不用管这个类本身是 Robot、还是 Human，又或者是其他啥，也不用去继承一大堆自己用不到的方法。

**<u>关于这条原则，其实也有一个对应的名字，叫做合成/聚合复用原则 Composition/Aggregation Reuse Principle，英语简称 CARP</u>**.

这条原则其实大家应该是比较熟悉的，因为在前端开发中，就有很多的地方体现了 CARP 原则。

**1. Vue3 的组合API**

Vue3 引入的组合API（CompositionAPI）是一个设计上采纳了组合复用原则的例子，它允许开发者将组件的逻辑按照功能组织成可复用的组合函数。

```js
import { ref, computed } from "vue";

// 一个简单的组合函数，用于管理计数逻辑
function useCounter() {
  const count = ref(0);
  const increment = () => {
    count.value++;
  };
  return { count, increment };
}

export default {
  setup() {
    // 在组件中使用 useCounter
    const { count, increment } = useCounter();
    return { count, increment };
  },
};
```

**2. React 的 Hooks**

React16.8 引入的 Hooks 也是遵循组合复用原则的一个例子。Hooks 允许你在不编写类的情况下使用 state 和其他 React 特性。

例如，useState 和 useEffect 这样的 Hooks 可以被组合在一起，用于在函数组件中添加状态管理和副作用处理。

```jsx
import React, { useState, useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function Counter() {
  const [count, setCount] = useState(0);

  // 使用自定义Hook来设置文档标题
  useDocumentTitle(`You clicked ${count} times`);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

在这个例子中，useDocumentTitle 是一个自定义 Hook，它将 useEffect 与业务逻辑（设置文档标题）组合在一起，以实现特定的功能，这些功能可以在多个组件之间共享和复用。

**3. 高阶组件**

高阶组件（High-Order Component，简称HOC）是 React 中一种重要的模式，用于复用组件逻辑。

一个高阶组件是一个函数，它接收一个组件并返回一个新的组件。

```jsx
// React 中的一个简单 HOC 例子
function withExtraInfo(WrappedComponent) {
    return function(props) {
        return (
            <WrappedComponent {...props} extraInfo="This is extra info" />
        );
    };
}
```

**4. 原生 JS**

在原生 JavaScript 中，组合的思想也广泛存在，可以通过对象组合来共享或复用功能，而不是使用继承。

```js
const canEat = {
  eat: function () {
    this.hunger--;
    console.log("eating");
  },
};

const canWalk = {
  walk: function () {
    console.log("walking");
  },
};

function Person(name) {
  this.name = name;
  this.hunger = 10;
}

// 使用Object.assign来组合对象
Object.assign(Person.prototype, canEat, canWalk);

const person = new Person("Bob");
person.eat(); // 输出: eating
person.walk(); // 输出: walking
```

通过 Object.assign，Person 对象组合了 canEat 和 canWalk 的行为，而不是通过继承来获得这些功能。



好了，这就是设计原则中**<u>最基本的三条原则</u>**，**<u>后面要介绍的所有原则，以及模式都是围绕着这三条基本原则展开的</u>**。

下一堂课，我们将介绍设计原则中比较著名的 SOLID 原则。

---

-EOF-

