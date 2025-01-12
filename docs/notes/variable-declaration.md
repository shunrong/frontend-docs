---
nav:
  title: 笔记
  path: /notes
group:
  title: 语言基础
  order: 1
---

# JavaScript 变量声明

JavaScript 提供了三种声明变量的方式：`var`、`let` 和 `const`。每种方式都有其特定的作用域规则和使用场景。

## var 声明

`var` 是最早的变量声明方式，但有一些问题需要注意：

```javascript
var name = 'JavaScript';

// 1. 变量提升
console.log(age);  // undefined
var age = 25;

// 等同于：
var age;
console.log(age);
age = 25;

// 2. 函数作用域
function example() {
  var local = 'local variable';
  if (true) {
    var local = 'another value';  // 同一个变量
  }
  console.log(local);  // 'another value'
}

// 3. 全局对象属性
var global = 'global variable';
console.log(window.global);  // 'global variable'
```

### var 的问题
- 存在变量提升
- 可以重复声明
- 仅有函数作用域
- 会成为全局对象的属性

## let 声明

`let` 是 ES6 引入的块级作用域变量声明方式：

```javascript
let count = 1;

// 1. 块级作用域
{
  let blockScoped = 'only in this block';
  console.log(blockScoped);  // 正常工作
}
// console.log(blockScoped);  // ReferenceError

// 2. 暂时性死区（TDZ）
// console.log(value);  // ReferenceError
let value = 'value';

// 3. 不允许重复声明
let user = 'John';
// let user = 'Jane';  // SyntaxError

// 4. 不会成为全局对象的属性
let globalLet = 'not global';
console.log(window.globalLet);  // undefined
```

### let 的特点
- 块级作用域
- 没有变量提升
- 不能重复声明
- 不会污染全局对象

## const 声明

`const` 用于声明常量，声明后的值不能被重新赋值：

```javascript
const PI = 3.14159;

// 1. 必须初始化
// const name;  // SyntaxError

// 2. 不能重新赋值
// PI = 3.14;  // TypeError

// 3. 对象属性可以修改
const user = {
  name: 'John'
};
user.name = 'Jane';  // 允许
// user = {};  // TypeError

// 4. 数组元素可以修改
const arr = [1, 2, 3];
arr.push(4);  // 允许
// arr = [];  // TypeError
```

### const 的特点
- 声明时必须初始化
- 不能重新赋值
- 块级作用域
- 对于引用类型，可以修改其属性

## 最佳实践

### 1. 优先使用 const

```javascript
// 优先使用 const
const MAX_COUNT = 10;
const config = {
  theme: 'dark',
  language: 'en'
};

// 需要重新赋值时使用 let
let currentCount = 0;
```

### 2. 避免使用 var

```javascript
// 不推荐
var name = 'old way';

// 推荐
const name = 'new way';
let changeable = 'can be changed';
```

### 3. 命名规范

```javascript
// 常量使用大写下划线
const MAX_LENGTH = 100;
const API_KEY = 'xxx';

// 变量使用驼峰命名
let firstName = 'John';
let isActive = true;
```

### 4. 作用域最小化

```javascript
// 不推荐
let i = 0;
for (i = 0; i < 10; i++) {}

// 推荐
for (let i = 0; i < 10; i++) {}
```

## 总结

1. **var**：
   - 函数作用域
   - 变量提升
   - 可重复声明
   - 不推荐使用

2. **let**：
   - 块级作用域
   - 不提升
   - 不可重复声明
   - 适合需要重新赋值的变量

3. **const**：
   - 块级作用域
   - 不可重新赋值
   - 声明时必须初始化
   - 首选的变量声明方式 