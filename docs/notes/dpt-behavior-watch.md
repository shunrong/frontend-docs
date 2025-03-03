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
title: 观察者模式
order: 20
---

# 观察者模式

观察者模式的定义如下：

> 观察者模式是一种行为型的模式，允许你定义一种订阅机制，之后对象相应的事件发生的时候，通知多个观察者，这些观察者会根据事件进行一些自身的行为。



## 场景举例

假如你有两种类型的对象： 顾客和商店 。顾客对某个特定品牌的产品非常感兴趣（例如最新型号的手机），而该产品很快将会在商店里出售。

这边会有两种设计方案：

- 顾客每天跑到商场一趟，看一下新产品是否发售。很明显这种设计是不合理
- 商店主动向所有人都发送邮件，这种设计让部分有需求的顾客不再需要前往商店了，但是会惹恼另外一部分没有这种需求的顾客，此时对于没有需求的用户来讲，邮件就是垃圾邮件。这种设计很明显也不合理

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-22-074632.png" alt="image-20240322154631735" style="zoom:50%;" />

正确的解决方案：有需求的顾客主动向商店报备，商店将这一部分顾客记录到名单里面。之后新产品开售了，商店只需要给名单里面有登记的顾客发送通知邮件即可。

在上述的这种场景中，其实就是一种观察者模式。这些登记在了商店名单里面的顾客就是观察者，新产品发售就是对应的事件，当新产品发售的时候，通知名单里面所有的顾客，顾客接到邮件通知之后，就会前往商店购买产品。



## 具体类图

观察者模式对应的类图如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-22-075151.png" alt="image-20240322155150797" style="zoom:70%;" />

1. 发布者：内部维护了一个观察者列表，里面记录了所有的观察者，另外还可以添加一个观察者、删除一个观察者以及通知所有的观察者。
2. 当新事件发生的时候，发布者就会遍历整个观察者列表，然后调用每个观察者对应的方法，例如 update 方法
3. 观察者接口：定义了观察者统一的方法约束，也就是说，如果你要成为一个观察者，你需要有一个 update 方法
4. 具体的观察者：实现了观察者接口里面所定义的方法
5. 观察者内部需要有 update 方法的具体实现
6. 客户端会分别的创建发布者和观察者，然后将观察者添加到发布者内部的观察者列表里面。



具体实现代码请参阅随堂课堂代码。



## 前端的应用场景

在前端开发中，除了 Vue 响应式原理以外，还有很多地方都能够见到观察者模式的影子。



### 1. DOM事件注册

这个其实就是一种观察者模式，一个 DOM 元素（发布者）可以有多个事件监听器（观察者）。

```js
// 获取 DOM 元素（发布者）
const button = document.getElementById('myButton');

// 第一个事件处理器，充当观察者的身份
function firstObserver() {
  console.log('First observer responded to button click');
}

// 第二个事件处理器，同样也是充当观察者的身份
function secondObserver() {
  console.log('Second observer responded to button click');
}

// 注册事件实际上就可以看作是发布者对观察者进行登记，或者说添加观察者的行为
button.addEventListener('click', firstObserver);
button.addEventListener('click', secondObserver);

// 后期当用户真实的触发点击事件的时候，对应类型的所有的事件处理器都会被触发
// 相当于就是发布者通知所有的观察者，观察者进行自身的一些行为
```



### 2. MutationObserver

这是一个 WebAPI，这个 API 允许开发者监听 DOM 树的变化，包括元素的添加、删除、属性的变化之类的，监听到变化之后，可以在这些变化发生时，作出一些相应的行为。

基本使用示例如下：

```html
<body>
  <ul id="myList">
    <li>Item1</li>
    <li>Item2</li>
  </ul>
  <button id="addBtn">添加Item</button>
  <button id="removeBtn">移除最后一个Item</button>
  <button id="modifyBtn">修改最后一个Item</button>
</body>
```

```js
// 获取相应的 DOM 元素
const myList = document.getElementById("myList");
const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");
const modifyBtn = document.getElementById("modifyBtn");

// 创建一个 MutationObserver 实例
// mutationsList 是一个 MutationRecord 对象的数组
// 每一个 MutationRecord 对象代表一个被观察到的 DOM 对象
const observer = new MutationObserver((mutationsList) => {
  // 遍历这些被观察的 DOM 对象
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      // 这里是 DOM 节点发生了改变
      console.log("A child node has been added or removed.");
    } else if (mutation.type === "attributes") {
      // DOM 属性发生了改变
      console.log(
        "The " + mutation.attributeName + " attribute was modified."
      );
    }
  }
});

// 接下来我们调用 observe 来进行观察
// 该方法接收两个参数，第一个是要观察的 DOM 元素，第二个是一个配置对象
observer.observe(myList, {
  attributes: true, // 会观察 DOM 元素的属性变化
  childList: true, // 会观察 DOM 元素的直接子节点变化
  subtree: true, // 会观察 DOM 元素的所有后代节点
});

// 后面就是对 DOM 元素进行操作
addBtn.onclick = function () {
  const li = document.createElement("li");
  li.textContent = "Item" + (myList.children.length + 1);
  myList.appendChild(li);
};

removeBtn.onclick = function () {
  myList.removeChild(myList.lastElementChild);
};

modifyBtn.onclick = function () {
  myList.lastElementChild.setAttribute("style", "color: red;");
};
```

在 MutationObserver 中：

- 发布者：DOM树，在上面的例子，就是 ul，它是被各个观察者所观察的对象，可以理解成前面例子中的商店，当他的节点发生变化的时候，它就会去“发布”这些变化。
- 观察者：MutationObserver 实例，它订阅了 DOM 的变化，当 DOM 发生变化的时候，执行所注册的回调函数。

和 MutationObserver 比较相似的，还有一个叫做 IntersectionObserver，该 API 提供了一个钟异步观察目标元素的方法，这个 API 本质上也是一个观察者模式。