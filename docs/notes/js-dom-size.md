---
nav:
  title: 笔记
  path: /notes
group:
  title: 基础-语言核心
  order: 1
type: JavaScript
title: 尺寸和位置
order: 26
---

在 *JavaScript* 中操作 *DOM* 节点使其运动的时候，常常会涉及到各种宽高以及位置坐标等概念，如果不能很好地理解这些属性所代表的意义，就会在书写代码时遇到不小的问题。而由于这些属性概念较多，加上浏览器之间实现方式不同，常常会造成概念混淆。

本章，我们就一起来总结一下使用 *JavaScript* 操作 *DOM* 时，尺寸和宽高相关的属性。



主要分为以下两部分：



- *DOM* 对象相关尺寸和位置属性
  - 只读属性
    - *clientWidth* 和 *clientHeight* 属性
    - *offsetWidth* 和 *offsetHeight* 属性
    - *clientTop* 和 *clientLeft* 属性
    - *offsetLeft* 和 *offsetTop* 属性
    - *scrollHeight* 和 *scrollWidth* 属性
  - 可读可写属性
    - *scrollTop* 和 *scrollLeft* 属性
    - *domObj.style.xxx* 属性
- *event* 事件对象相关尺寸和位置属性
  - *clientX* 和 *clientY* 属性
  - *screenX* 和 *screenY* 属性
  - *offsetX* 和 *offsetY* 属性
  - *pageX* 和 *pageY* 属性



## *DOM* 对象相关尺寸和位置属性



在 *DOM* 对象所提供的尺寸和位置相关属性中，可以分为**只读属性**和**可读可写属性**。



### 只读属性



所谓的只读属性指的是 *DOM* 节点的固有属性，该属性只能通过 *JavaScript* 去获取而不能通过 *JavaScript* 去设置，而且获取的值是只有数字并不带单位的（ *px、em* 等 ）

常见的只读属性有：

- *clientWidth* 和 *clientHeight* 属性
- *offsetWidth* 和 *offsetHeight* 属性
- *clientTop* 和 *clientLeft* 属性
- *offsetLeft* 和 *offsetTop* 属性
- *scrollHeight* 和 *scrollWidth* 属性

下面我们来一组一组进行介绍。



#### *clientWidth* 和 *clientHeight* 属性

该属性指的是元素的可视部分宽度和高度，即 *padding + content*，例如：

```html
<div id="container" class="container"></div>
```

```css
.container{
  width: 200px;
  height: 200px;
  background-color: red;
  border: 1px solid;
  overflow: auto;
  padding: 10px;
  margin: 20px;
}
```

```js
var container = document.getElementById("container");
console.log("clientWidth:",container.clientWidth); // 220
console.log("clientHeight:",container.clientHeight); // 220
```



#### *offsetWidth* 和 *offsetHeight* 属性

这一对属性指的是元素的 *border+padding+content* 的宽度和高度。例如：

```js
var container = document.getElementById("container");
console.log("offsetWidth:", container.offsetWidth); // 222
console.log("offsetWidth:", container.offsetWidth); // 222
```

可以看到该属性和 *clientWidth* 以及 *clientHeight* 相比，多了设定的边框 *border* 的宽度和高度。



#### *clientTop* 和 *clientLeft* 属性

这一对属性是用来读取元素的 *border* 的宽度和高度的。例如：

```js
var container = document.getElementById("container");
console.log("clientTop:", container.clientTop); // 1
console.log("clientLeft:", container.clientLeft); // 1
```



#### *offsetLeft* 和 *offsetTop* 属性

首先需要介绍一下 *offsetParent* 属性，该属性是获取当前元素的离自己最近的并且定了位的祖先元素，该祖先元素就是当前元素的 *offsetParent*。

如果从该元素向上寻找，找不到这样一个祖先元素，那么当前元素的 *offsetParent* 就是 *body* 元素。

*offsetLeft* 和 *offsetTop* 指的是当前元素，相对于其 *offsetParent* 左边距离和上边距离，即当前元素的 *border* 到包含它的 *offsetParent* 的 *border* 的距离。

下面我们来具体举例说明：

```js
var container = document.getElementById("container");
console.log(container.offsetParent); // body
```

可以看到，我们直接访问 *container* 盒子的 *offsetParent* 属性，因为不存在定了位的祖先元素，所以显示出来的是 *body* 元素。

接下来我们对上面的代码进行改造：

```html
<div id="container" class="container">
  <div id="item" class="item"></div>
</div>
```

```css
.container {
  width: 200px;
  height: 200px;
  background-color: red;
  border: 1px solid;
  overflow: auto;
  padding: 10px;
  margin: 20px;
  position: relative;
}
.item{
  width: 50px;
  height: 50px;
  background-color: blue;
  position: absolute;
  left: 100px;
  top: 100px;
}
```

当前效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-05-063813.png" alt="image-20211105143812415" style="zoom:50%;" />

接下来我们来获取 *item* 盒子的 *offsetLeft* 以及 *offsetTop* 属性值。

```js
var container = document.getElementById("container");
var item = document.getElementById("item");
console.log(item.offsetParent); // container 盒子 dom 对象
console.log(item.offsetLeft); // 100
console.log(item.offsetTop); // 100
```

接下来我们不对 *item* 子元素进行定位，而是使用 *margin* 的方式来设置子盒子的位置，如下：

```css
.item{
  width: 50px;
  height: 50px;
  background-color: blue;
  margin: 50px;
}
```

然后再次获取 *item* 盒子的 *offsetLeft* 以及 *offsetTop* 属性值，如下：

```js
var container = document.getElementById("container");
var item = document.getElementById("item");
console.log(item.offsetParent); // container 盒子 dom 对象
console.log(item.offsetLeft); // 60
console.log(item.offsetTop); // 60
```

可以看到，打印出来的是 *60*，因为我们设置的 *margin* 的值为 *50*，但是其定了位的父元素还设置了 *10* 像素的 *padding*，所以加起来就是 *60*。



#### *scrollHeight* 和 *scrollWidth* 属性

顾名思义，这两个属性指的是当元素内部的内容超出其宽度和高度的时候，元素内部内容的实际宽度和高度。

如果当前元素的内容没有超过其高度或者宽度，那么返回的就是元素的可视部分宽度和高度，即和 *clientWidth* 和 *clientHeight* 属性值相同。

```html
<div id="container" class="container">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla repellat porro atque culpa rem sunt sed! Voluptates vel incidunt accusamus reiciendis aut, adipisci ut. Hic, impedit officia.Quis, animi beatae. Facere dolorum quasi laborum, rem facilis illum necessitatibus sint doloribus beatae
exercitationem sapiente! Quod vel cupiditate quam libero, delectus natus.</div>
```

```css
.container {
  width: 200px;
  height: 200px;
  background-color: red;
  border: 1px solid;
  overflow: auto;
  padding: 10px;
  margin: 20px;
}
```

上面的代码中，我们为 *container* 盒子加入了一些文字，使其能够产生滚动效果，接下来访问 *scrollHeight* 和 *scrollWidth* 属性，如下：

```js
var container = document.getElementById("container");
console.log("scrollWidth:", container.scrollWidth); // scrollWidth: 220
console.log("scrollHeight", container.scrollHeight); // scrollHeight 372
```

如果 *container* 盒子不具备滚动的条件，那么返回的值和 *clientWidth* 和 *clientHeight* 属性值是相同的。

```html
<div id="container" class="container"></div>
```

```js
var container = document.getElementById("container");
console.log("scrollWidth:", container.scrollWidth); // scrollWidth: 220
console.log("scrollHeight", container.scrollHeight); // scrollHeight 220
```



### 可读可写属性



所谓的可读可写属性指的是不仅能通过 *JavaScript* 获取该属性的值，还能够通过 *JavaScript* 为该属性赋值。



#### *scrollTop* 和 *scrollLeft* 属性

这对属性是可读写的，指的是当元素其中的内容超出其宽高的时候，元素被卷起的高度和宽度。

```html
<div id="container" class="container">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla repellat porro atque culpa rem sunt sed! Voluptates vel incidunt accusamus reiciendis aut, adipisci ut. Hic, impedit officia.Quis, animi beatae. Facere dolorum quasi laborum, rem facilis illum necessitatibus sint doloribus beatae
exercitationem sapiente! Quod vel cupiditate quam libero, delectus natus.</div>
```

```css
.container {
  width: 200px;
  height: 200px;
  background-color: red;
  border: 1px solid;
  overflow: auto;
  padding: 10px;
  margin: 20px;
}
```

```js
var container = document.getElementById("container");
container.onscroll = function () {
  console.log("scrollTop:", container.scrollTop);
  console.log("scrollLeft", container.scrollLeft);
}
```

在上面的代码中，我们的 *container* 盒子内容超出了容器的高度，我们为该盒子绑定了 *scroll* 事件，滚动的时候打印出 *scrollTop* 和 *scrollLeft*，即元素被卷起的高度和宽度。

效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-05-071632.gif" alt="2021-11-05 15.15.58" style="zoom:50%;" />

该属性因为是可读可写属性，所以可以通过赋值来让内容自动滚动到某个位置。例如很多网站右下角都有回到顶部的按钮，背后对应的 *JavaScript* 代码就是通过该属性来实现的。



#### *domObj.style.xxx* 属性

对于一个 *DOM* 元素来讲，它的 *style* 属性返回的也是一个对象，并且这个对象中的任意一个属性是可读写的。例如 *domObj.style.top、domObj.style.wdith* 等，在读的时候，它们返回的值常常是带有单位的（如 *px* ）。

但是，对于这种方式，**它只能够获取到该元素的行内样式，而并不能获取到该元素最终计算好的样式**。如果想要获取计算好的样式，需要使用 *obj.currentstyle（ IE ）*和 *getComputedStyle*（ *IE* 之外的浏览器 ）

另一方面，由于 *domObj.style.xxx* 属性能够被赋值，所以 *JavaScript* 控制 *DOM* 元素运动的原理就是通过不断修改这些属性的值而达到其位置改变的，需要注意的是，**给这些属性赋值的时候需要带单位的要带上单位，否则不生效**。



## *event* 事件对象相关尺寸和位置属性



对于元素的运动的操作，通常还会涉及到事件里面的 *event* 对象，而 *event* 对象也存在很多位置属性，且由于浏览器兼容性问题会导致这些属性间相互混淆，这里也来进行一个总结。



#### *clientX* 和 *clientY* 属性

这对属性是当事件发生时，鼠标点击位置相对于浏览器（可视区）的坐标，即浏览器左上角坐标的（ *0 , 0* ），该属性以浏览器左上角坐标为原点，计算鼠标点击位置距离其左上角的位置，

不管浏览器窗口大小如何变化，都不会影响点击位置的坐标。

```html
<div id="container" class="container"></div>
```

```css
*{
  margin: 0;
  padding: 0;
}
.container {
  width: 200px;
  height: 200px;
  background-color: red;
  border: 1px solid;
  overflow: auto;
  padding: 10px;
  margin: 20px;
}
```

```js
var container = document.getElementById("container");
container.onclick = function (ev) {
  var evt = ev || event;
  console.log(evt.clientX + ":" + evt.clientY);
}
```

在上面的代码中，我们为 *container* 盒子绑定了点击事件，获取该盒子的 *clientX* 以及 *clientY* 的值，接下来我们来进行点击测试：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-05-073614.png" alt="image-20211105153614467" style="zoom:50%;" />

我们分别点击该盒子的最左上角和最右下角，打印出来的值分别是（*20 , 20*）和 （*241 , 241*），可以看出这确实是以浏览器左上角坐标的（ *0 , 0* ）为原点来进行计算的。



#### *screenX* 和 *screenY* 属性

*screenX* 和 *screenY* 是事件发生时鼠标相对于屏幕的坐标，以设备屏幕的左上角为原点，事件发生时鼠标点击的地方即为该点的 *screenX* 和 *screenY* 值。例如：

```js
var container = document.getElementById("container");
container.onclick = function (ev) {
  var evt = ev || event;
  console.log(evt.screenX + ":" + evt.screenY);
}
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-05-074500.png" alt="image-20211105154500066" style="zoom:50%;" />

我们将浏览器缩小，同样是点击 *container* 盒子的最左上角，打印出来的是（*368 , 365*），因为这是以屏幕最左上角为原点的。



#### *offsetX* 和 *offsetY* 属性

这一对属性是指当事件发生时，鼠标点击位置相对于该事件源的位置，即点击该 *DOM* 元素，以该 *DOM* 左上角为原点来计算鼠标点击位置的坐标。例如：

```js
var container = document.getElementById("container");
container.onclick = function (ev) {
  var evt = ev || event;
  console.log("offsetX:", evt.offsetX);
  console.log("offsetY:", evt.offsetY);
}
```

同样点击 *container* 元素的最左上角，打印出（ *0, 0* ）



#### *pageX* 和 *pageY* 属性

顾名思义，该属性是事件发生时鼠标点击位置相对于页面的位置，通常浏览器窗口没有出现滚动条时，该属性和 *clientX* 及 *clientY* 是等价的。

例如：

```js
var container = document.getElementById("container");
container.onclick = function (ev) {
  var evt = ev || event;
  console.log("pageX:", evt.pageX);
  console.log("pageY:", evt.pageY);
  console.log("clientX:", evt.clientX);
  console.log("clientY:", evt.clientY);
}
```

此时点击 *container* 盒子，得到的 *pageX、pageY* 的值和 *clientX、clientY* 完全相同。

但是当浏览器出现滚动条的时候，*pageX* 通常会大于 *clientX*，因为页面还存在被卷起来的部分的宽度和高度。

例如：

```css
...
body{
  height: 5000px;
}
...
```

我们为 *body* 添加一个 *height* 为 *500px*，使其能够产生滚动效果，此时两组属性的区别就出来了。如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-05-080641.gif" alt="2021-11-05 16.06.06" style="zoom:50%;" />



------



-*EOF*-


