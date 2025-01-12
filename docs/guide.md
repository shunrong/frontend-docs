# 变量

在 JavaScript 中，变量是用于存储数据的基本单位。变量的声明和定义是编程的基础，理解不同的声明方式及其特性对于编写高效、可维护的代码至关重要。JavaScript 提供了三种主要的变量声明方式：`var`、`let` 和 `const`。下面将详细介绍这三种声明方式的区别。

## 1. `var` 声明

### 1.1 作用域
- **函数作用域**：`var` 声明的变量在函数内部有效，如果在函数外部声明，则为全局变量。
  
### 1.2 提升
- **变量提升**：`var` 声明的变量会被提升到函数或全局的顶部，但赋值不会提升。即使在声明之前访问该变量，结果也会是 `undefined`。

### 1.3 示例
```javascript
console.log(a); // undefined
var a = 10;
console.log(a); // 10

function testVar() {
    var b = 20;
}
console.log(b); // ReferenceError: b is not defined
```

## 2. `let` 声明

### 2.1 作用域
- **块作用域**：`let` 声明的变量只在其所在的代码块（`{}`）内有效。

### 2.2 提升
- **变量提升**：`let` 声明的变量也会被提升，但在声明之前不能访问（会抛出 `ReferenceError`），这被称为“暂时性死区”。

### 2.3 示例
```javascript
{
    let x = 30;
    console.log(x); // 30
}
console.log(x); // ReferenceError: x is not defined

console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 40;
```

## 3. `const` 声明

### 3.1 作用域
- **块作用域**：`const` 声明的变量同样只在其所在的代码块内有效。

### 3.2 不可变性
- **不可重新赋值**：`const` 声明的变量必须在声明时初始化，并且不能被重新赋值。注意，`const` 只保证变量的引用不可变，如果是对象或数组，内部的属性或元素仍然可以被修改。

### 3.3 示例
```javascript
const z = 50;
console.log(z); // 50
// z = 60; // TypeError: Assignment to constant variable.

const obj = { name: 'Alice' };
obj.name = 'Bob'; // 这是允许的
console.log(obj.name); // Bob
```

## 4. 总结与比较

| 特性         | `var`                     | `let`                     | `const`                   |
|--------------|---------------------------|---------------------------|---------------------------|
| 作用域       | 函数作用域或全局作用域   | 块作用域                 | 块作用域                 |
| 提升         | 是（但赋值不提升）       | 是（暂时性死区）         | 是（暂时性死区）         |
| 重新赋值     | 允许                     | 允许                     | 不允许                   |
| 初始化要求   | 可选                     | 必须                     | 必须                     |

## 5. 结论
在 JavaScript 中，选择合适的变量声明方式非常重要。一般来说，推荐使用 `let` 和 `const`，因为它们提供了更严格的作用域控制和更清晰的代码意图。`const` 应用于不需要重新赋值的变量，而 `let` 则用于需要在块内重新赋值的变量。`var` 由于其提升和作用域的特性，通常不推荐在现代 JavaScript 中使用。
