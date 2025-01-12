---
nav:
  title: 笔记
  path: /notes
group:
  title: 语言基础
  order: 1
---

# JavaScript 中的值类型

JavaScript 是一门动态类型语言，但它仍然有明确的值类型系统。理解这些类型对于编写可靠的 JavaScript 代码至关重要。

## 基本数据类型

JavaScript 有 7 种基本数据类型（原始类型）：

### 1. Number

表示数字，包括整数和浮点数：

```javascript
const int = 42;           // 整数
const float = 42.42;      // 浮点数
const infinity = Infinity; // 无穷大
const minusInf = -Infinity; // 负无穷大
const notNumber = NaN;    // 非数字

// 特殊值
console.log(0.1 + 0.2);        // 0.30000000000000004
console.log(Number.MAX_VALUE);  // 1.7976931348623157e+308
console.log(Number.MIN_VALUE);  // 5e-324
```

### 2. String

表示文本数据：

```javascript
const single = 'single quotes';
const double = "double quotes";
const template = `template literal: ${1 + 1}`;

// 常用操作
'hello'.length;          // 5
'hello'.toUpperCase();   // 'HELLO'
'hello'.indexOf('l');    // 2
'hello'.includes('lo');  // true
```

### 3. Boolean

表示逻辑值：

```javascript
const isTrue = true;
const isFalse = false;

// 假值（Falsy values）
console.log(Boolean(false));     // false
console.log(Boolean(0));         // false
console.log(Boolean(''));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false
```

### 4. Undefined

表示未定义：

```javascript
let notDefined;
console.log(notDefined);        // undefined

// 常见场景
const obj = {};
console.log(obj.notExist);      // undefined
function foo() { return; }
console.log(foo());             // undefined
```

### 5. Null

表示空值：

```javascript
const empty = null;

// null 与 undefined 的区别
console.log(typeof null);       // 'object' (JavaScript 的一个著名 bug)
console.log(typeof undefined);  // 'undefined'
console.log(null === undefined);// false
console.log(null == undefined); // true
```

### 6. Symbol

表示唯一的标识符：

```javascript
const sym1 = Symbol('description');
const sym2 = Symbol('description');
console.log(sym1 === sym2);     // false

// 常用场景
const obj = {
  [Symbol('name')]: 'symbol property'
};
```

### 7. BigInt

表示任意精度的整数：

```javascript
const bigInt = 9007199254740991n;
const result = bigInt + 1n;

// 不能与 Number 混合运算
// console.log(bigInt + 1); // TypeError
console.log(Number(bigInt) + 1); // 正确的转换方式
```

## 引用类型

除了基本类型，JavaScript 还有引用类型：

### 1. Object

对象是键值对的集合：

```javascript
const obj = {
  name: 'object',
  method() {
    return this.name;
  }
};

// 访问属性
obj.name;                // 点号语法
obj['name'];            // 方括号语法
Object.keys(obj);       // 获取所有键
Object.values(obj);     // 获取所有值
```

### 2. Array

数组是有序的集合：

```javascript
const arr = [1, 2, 3];

// 常用方法
arr.push(4);            // 添加元素
arr.pop();              // 移除最后一个元素
arr.map(x => x * 2);    // 映射
arr.filter(x => x > 1); // 过滤
arr.reduce((a, b) => a + b); // 归约
```

### 3. Function

函数是可执行的对象：

```javascript
// 函数声明
function foo() {}

// 函数表达式
const bar = function() {};

// 箭头函数
const arrow = () => {};

// 函数也是对象
console.log(typeof foo);        // 'function'
console.log(foo instanceof Object); // true
```

## 类型检查

### 1. typeof 操作符

```javascript
typeof 42;              // 'number'
typeof 'str';           // 'string'
typeof true;            // 'boolean'
typeof undefined;       // 'undefined'
typeof null;            // 'object' (bug)
typeof Symbol();        // 'symbol'
typeof 42n;             // 'bigint'
typeof {};              // 'object'
typeof [];              // 'object'
typeof function(){};    // 'function'
```

### 2. instanceof 操作符

```javascript
[] instanceof Array;            // true
[] instanceof Object;           // true
function(){} instanceof Function; // true
```

## 类型转换

### 1. 显式转换

```javascript
String(42);            // "42"
Number('42');          // 42
Boolean(1);            // true
Array.from('hello');   // ['h', 'e', 'l', 'l', 'o']
```

### 2. 隐式转换

```javascript
'1' + 2;              // '12'
'1' - 2;              // -1
1 + true;             // 2
if ('string') { }     // true
```

## 最佳实践

1. 使用 `===` 而不是 `==` 进行比较
2. 使用 `typeof` 检查基本类型
3. 使用 `instanceof` 检查引用类型
4. 注意隐式类型转换可能带来的问题
5. 优先使用显式类型转换 