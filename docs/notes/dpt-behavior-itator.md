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
title: 迭代器模式
order: 25
---

# 迭代器模式

JS 中天然所支持的迭代器模式：

```js
const arr = [1, 2, 3, 4, 5];
for(const i of arr) {
    console.log(i);
}
```

另外比如 ES6 提供的 Generator 函数，可以暂停函数的执行，当外部调用 Generator 函数的时候，返回的其实也就是一个迭代器。

```js
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator(); // "gen" 是一个迭代器

console.log(gen.next().value); // 输出：1
console.log(gen.next().value); // 输出：2
console.log(gen.next().value); // 输出：3
```



## 基本介绍

迭代器模式的定义如下：

>这是一种行为设计模式，作用是在不暴露底层数据结构的情况下遍历集合中所有的元素。

集合是编程中用到最多的一种数据类型之一。集合的本质就是一组元素的容器，本身这个容器可以是多种多样的，例如数组就是集合的一种，除了数组以外，常见的还有栈、树、图：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-25-075000.png" alt="image-20240325154959818" style="zoom:50%;" />

无论集合的结构是什么样的，我们需要提供一种能够访问该集合中所有元素的能力。

另外，访问一个集合中所有元素的方式可能还有好几种。

- 数组：从前往后遍历、从后往前遍历
- 树：深度优先遍历、广度优先遍历

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-25-075140.png" alt="image-20240325155140128" style="zoom:50%;" />

另外， 客户端并不关心集合内部是如何获取每一个元素的，我只需要你给我提供一个接口，我可以通过该接口获取到集合里面的每一个元素即可。

因此，我们就可以针对不同的迭代方式，进行一层抽象：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-25-075645.png" alt="image-20240325155644920" style="zoom:50%;" />

在上图中，你内部用深度优先算法也好，广度优先算法也罢，反正对外部提供一个统一的接口，外部通过调用这个接口来访问所有的元素。

一般来讲，这个统一的接口会提供两个方法：

- getNext：获取下一个元素
- hasMore：是否还有没迭代完的元素



## 具体实现

首先是迭代器模式的类图结构：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-25-080114.png" alt="image-20240325160113783" style="zoom:50%;" />

1. 迭代器接口：声明了具体迭代器要实现的方法
2. 具体的迭代器：里面封装了一套迭代的算法，每个具体的迭代器需要实现上面的接口
3. 集合的接口：规定了一个 createIterator 的方法，该方法一般就是返回一个迭代器。
4. 具体的集合：不管这个集合底层的数据结构是怎么样的（数组、树、图...），但是需要实现上面的集合接口，也就是实现 createIterator 的方法，回头外部调用该方法，能够获取到一个迭代器。
5. 客户端：通过迭代器来获取集合里面的每一个元素。

具体代码请参阅随堂课堂代码。



## 可迭代协议

在 JS 中，有一些数据结构是天然实现了可迭代协议：

```js
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}

const set = new Set([1, 2, 3]);

for (const value of set) {
  console.log(value);
}
```

当你的一个数据结构实现了可迭代协议，那么意味着你可以使用 for of 来进行迭代。

如果是没有实现可迭代协议的数据结构，那么就没有办法使用 for of 进行迭代：

```js
const obj = {
  name: "张三",
  age: 18,
  gender: "男",
  [Symbol.iterator]() {
    // 根据可迭代协议书写具体的迭代方式
    const keys = Object.keys(this);
    let index = 0;

    return {
      next: () => {
        if (index < keys.length) {
          // 说明还存在下一个元素
          return {
            value: this[keys[index++]],
            done: false,
          };
        } else {
          // 说明迭代完了，没有更多的元素了
          return {
            value: undefined,
            done: true,
          };
        }
      },
    };
  },
};

// for (const idx in obj) {
//   console.log(idx);
// }

for (const item of obj) {
  console.log(item);
}
```

在上面的例子中，我们根据可迭代协议，实现了具体迭代方式，之后对象就可以使用 for of 来进行遍历了。

而这个可迭代协议，本质上就是迭代器的一套接口。
