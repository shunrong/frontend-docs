---
nav:
  title: 笔记
  path: /notes
group:
  title: 基础-语言核心
  order: 1
type: CSS
title: 层叠上下文
order: 17
---

# 层叠上下文

## 经典真题

- 请简述什么是层叠上下文、什么是层叠等级、什么是层叠顺序



## 层叠上下文

在介绍层叠上下文之前，我们先来介绍一下 *HTML* 文档中的三维概念。

平时我们从设备终端看到的 *HTML* 文档都是一个平面的，事实上 *HTML* 文档中的元素却是存在于三个维度中。除了大家熟悉的平面画布中的 *x* 轴和 *y* 轴，还有控制第三维度的 *z* 轴。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-29-025842.png" alt="image-20211229105842101" style="zoom:50%;" />

其中 *x* 轴通常用来表示水平位置，*y* 轴来表示垂直位置，*z* 轴表示屏幕内外方向上的位置。

对于 *x* 和 *y* 轴我们很易于理解，一个向右，一个向下。但对于 *z* 轴，理解起来就较为费力。在 *CSS* 中要确定沿着 *z* 轴排列元素，表示的是用户与屏幕的这条看不见的垂直线：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-29-030053.png" alt="image-20211229110052865" style="zoom:50%;" />

而这里我们要讨论的层叠上下文（ *stacking context* ），就是 *HTML* 中的一个三维的概念。如果一个元素含有层叠上下文，我们可以理解为这个元素在 *z* 轴上就“高人一等”，最终表现就是它离屏幕观察者更近。



听上去好像很不错的样子，我想让一个元素更加靠前，我就给他创建一个层叠上下文。

那么具体的创建方法有哪些呢？

一般来讲有 *3* 种方法：

- *HTML* 中的根元素 *HTML* 本身就具有层叠上下文，称为“根层叠上下文”。
- 普通元素设置 *position* 属性为非 *static* 值并设置 *z-index* 属性为具体数值，会产生层叠上下文
- *CSS3* 中的新属性也可以产生层叠上下文



赶紧试验一下：

```html
<div class="one"></div>
<div class="two"></div>
```

```css
div{
  width: 200px;
  height: 200px;
}
.one{
  background-color: red;
}
.two{
  background-color: blue;
  margin-top: -100px;
}
```

在上面的代码中，我们创建了两个 *div*，然后使其产生重叠，默认情况下后来居上，蓝色的会盖住红色的。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-29-030918.png" alt="image-20211229110917880" style="zoom:50%;" />

下面我们给红色设置一个定位，如下：

```css
...
.one{
  background-color: red;
  position: relative;
  z-index: 1;
}
...
```

由于设置了定位和 *z-index* 属性，所以红色的 *div* 就会创建一个层叠上下文，在 *z* 轴上就“高人一等”。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-29-031127.png" alt="image-20211229111127835" style="zoom:50%;" />

*OK*，感觉很简单的样子，打完收工，撤退！

但是且慢少年，这才刚刚开始。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-29-032035.png" alt="image-20211229112034560" style="zoom:50%;" />



## 层叠等级与层叠顺序

除了层叠上下文，我们还需要了解两个概念：

- 层叠等级（ *stacking level* ）
- 层叠顺序（ *stacking order* ）

这两个东西实际上都是用来表述：

> 在同一个层叠上下文中，元素在 *z* 轴上的显示顺序。

只不过前一个是概念，后一个是具体规则。



如果两个元素在同一个层叠上下文中，那么层叠等级越大的元素，就越靠前。

那么问题来了，我怎么知道该元素的层叠等级是高还是低？

所以层叠等级的高低规则是由层叠顺序来体现的。

在 *CSS2.1* 的年代（注意这里的前提），层叠顺序规则遵循下面这张图：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-17-031328.png" alt="image-20210917111327410" style="zoom:50%;" />

那么如果两个元素不在同一个层叠下上文中呢？

那么此时就先比较他们所处的层叠上下文的层叠等级，也就是所谓的“从父”现象。

>假设一个官员 *A* 是个省级领导，他下属有一个秘书 *a-1*，家里有一个保姆 *a-2*。另一个官员 *B* 是一个县级领导，他下属有一个秘书 *b-1*，家里有一个保姆 *b-2*。
>
>*a-1* 和 *b-1* 虽然都是秘书，但是你想一个省级领导的秘书和一个县级领导的秘书之间有可比性么？甚至保姆 *a-2* 都要比秘书 *b-1* 的等级高得多。谁大谁小，谁高谁低一目了然，所以根本没有比较的意义。
>
>因此只有在 *A* 下属的 *a-1、a-2* 以及 *B* 下属的 *b-1、b-2* 中相互比较大小高低才有意义。



## 实战案例

在开始实战案例之前，我们先对上面的知识进行一个总结。

1. 首先先看要比较的两个元素是否处于同一个层叠上下文中：

   - 如果是，谁的层叠等级大，谁在上面（判断层叠等级大小参阅上面的“层叠顺序”图）

   - 如果两个元素不在同一层叠上下文中，请先比较他们所处的层叠上下文的层叠等级。

2. 当两个元素层叠等级相同、层叠顺序相同时，在 *DOM* 结构中后面的元素层叠等级在前面元素之上。



接下来我们来通过几个实际的例子加深对上面概念的理解。

示例 1：

```html
<div class="one">
  <div class="item" style="background-color: black; z-index: 99;"></div>
</div>
<div class="two">
  <div class="item" style="background-color: pink;top: 50px; z-index: 1;"></div>
</div>
```

```css
div{
  width: 200px;
  height: 200px;
}
.one{
  background-color: red;
  position: relative;
  z-index: 1;
}
.two{
  background-color: blue;
  position: relative;
  z-index: 2;
}
.item{
  width: 100px;
  height: 100px;
  position: absolute;
  left: 200px;
  top: 200px;
}
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-29-052844.png" alt="image-20211229132843959" style="zoom:50%;" />

在上面的代码中，*one* 和 *two* 分别有自己的层叠上下文，但是 *two* 的层叠等级要比 *one* 高，之后我们可以看到，无论 *one* 中的子元素的 *z-index* 设置有多高，它始终被 *two* 的子元素给覆盖，因为如果两个元素不在同一层叠上下文中，比较的是所在层叠上下文的等级。



示例 2：

```html
<div class="box1">
  <div class="child1"></div>
</div>

<div class="box2">
  <div class="child2"></div>
</div>
```

```css
.box1,
.box2 {
  position: relative;
}

.child1 {
  width: 200px;
  height: 100px;
  background: #168bf5;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

.child2 {
  width: 100px;
  height: 200px;
  background: #32c292;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-17-032008.png" alt="image-20210917112008034" style="zoom:67%;" />

在上面的示例中，*.box1/.box2* 虽然设置了 *position: relative*，但是在没有设置 *z-index*。所以 *.box1/.box2* 仍然是普通元素，所以 *child1/.child2* 属于 *html* 元素的“根层叠上下文”中，也就是处于同一个层叠上下文中，根据层叠顺序谁的 *z-index* 值大，谁在上面。



示例 3:

将上面案例中的 *CSS* 代码稍作修改，如下：

```css
.box1,
.box2 {
  position: relative;
  z-index: 0;
}
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-17-032806.png" alt="image-20210917112806638" style="zoom:67%;" />

此时，我们发现，仅仅修改了 *.box1/.box2* 的 *z-index* 属性值改为数值 *0*，最终结果完全相反。

这时 *.child2* 覆盖在了 *.child1* 上面。原因是什么呢？

很简单：因为设置 *z-index: 0* 后，*.box1/.box2* 产生了各自的层叠上下文，这时候要比较 *.child1/.child2* 的层叠关系属于不同的层叠上下文进行比较，此时由由各自所在的 *.box1/.box2* 的层叠等级来决定。

但是 *.box1/.box2* 的 *z-index* 值都为 *0*，都是块级元素（所以它们的层叠等级，层叠顺序是相同的），这种情况下，在 *DOM* 结构中后面的覆盖前面的，所以 *.child2* 就在上面。



示例 4:

```html
<div class="box">
  <img src="./ok.png" alt="" class="item">
</div>
```

```css
.box{
  width: 200px;
  height: 200px;
  background: blue;
  position: absolute;
}
.item{
  position: absolute;
  width: 200px;
  left: 50px;
  top: 50px;
  z-index: -1;
}
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-29-054235.png" alt="image-20211229134234900" style="zoom:50%;" />

在上面的代码中，*.box* 虽然设置了定位，但是并没有设置 *z-index* 属性，所以并不会产生层叠上下文，仅仅是一个普通元素，此时 *.item* 图片属于 *html* 元素的“根层叠上下文”中，根据层叠顺序谁的 *z-index* 值大，谁在上面。



示例 5：

将上面的代码稍作修改，为 *.box* 添加一个 *z-index* 属性，并且给了一个很大的值

```css
.box{
  width: 200px;
  height: 200px;
  background: blue;
  position: relative;
  z-index: 99;
}
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-29-061343.png" alt="image-20211229141342897" style="zoom:50%;" />

此时效果就完全不一样了，明明 *.box* 给了一个很大的值，但是图片却在上面，这是为什么呢？

因为 当 *.box* 设置了 *z-index* 后，就会产生一个层叠上下文，也就是说对 *.item* 图片而言，找到的层叠上下文是 *.box* 而不是 *html* 根元素。而根据层叠顺序，*background* 是处于最下层的，所以图片显示在了最上面。



示例 6：

```html
<div class="parent">
  parent
  <div class="child1">child1</div>
  <div class="child2">
    child2
    <div class="child2-1">child2-1</div>
    <div class="child2-2">child2-2</div>
  </div>
</div>
```

```css
.parent {
  width: 100px;
  height: 200px;
  background: #168bf5;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.child1 {
  width: 100px;
  height: 200px;
  background: #32d19c;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
}

.child2 {
  width: 100px;
  height: 200px;
  background: #e4c950;
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: -1;
}

.child2-1 {
  width: 100px;
  height: 200px;
  background: #e45050;
  position: absolute;
  top: 60px;
  left: 60px;
  z-index: 9999;
}

.child2-2 {
  width: 100px;
  height: 200px;
  background: #db68a7;
  position: absolute;
  top: 80px;
  left: 40px;
  z-index: -9999;
}
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-17-035354.png" alt="image-20210917115354011" style="zoom:67%;" />

在上面的代码中，对于 *.child1* 和 *.child2* 来讲，他俩是处于同一个层叠上下文中，所以 *.child1* 在 *.child2* 的上面（因为 *.child1* 的 *z-index* 值更大），而对于 *.child2-1* 和 *.child2-2* 来讲，他俩也是处于同一个层叠上下文 *.child2* 里面，所以无论 *.child2* 的 *z-index* 值有多大，都一定在  *.child2-1* 和 *.child2-2* 下面，而  *.child2-1* 和 *.child2-2* 则根据 *z-index* 值的大小来决定谁覆盖谁。



## *CSS3* 中属性对层叠上下文的影响

*CSS3* 中出现了很多新属性，其中一些属性对层叠上下文也产生了很大的影响。如下：

- 父元素的 *display* 属性值为 *flex|inline-flex*，子元素 *z-index* 属性值不为 *auto* 的时候，子元素为层叠上下文元素
- 元素的 *opacity* 属性值不是 *1*
- 元素的 *transform* 属性值不是 *none*
- 元素 *mix-blend-mode* 属性值不是 *normal*
- 元素的 *filter* 属性值不是 *none*
- 元素的 *isolation* 属性值是 *isolate*
- *will-change* 指定的属性值为上面任意一个
- 元素的 *-webkit-overflow-scrolling* 属性值设置为 *touch*



*CSS3* 中，元素属性满足以上条件之一，就会产生层叠上下文。我们用第 *1* 条来做一个简单的解释说明。

```html
<div class="box">
  <div class="parent">
    parent
    <div class="child">child</div>
  </div>
</div>
```

```css
.box {
}
.parent {
  width: 200px;
  height: 100px;
  background: #168bf5;
  /* 虽然设置了z-index，但是没有设置position，z-index 无效，.parent还是普通元素，没有产生层叠上下文 */
  z-index: 1;
}

.child {
  width: 100px;
  height: 200px;
  background: #32d19c;
  position: relative;
  z-index: -1;
}
```

效果：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-17-034514.png" alt="image-20210917114513631" style="zoom:67%;" />



我们发现，*.child* 被 *.parent* 覆盖了。按照之前的规则来分析一下： 

虽然 *.parent* 设置了 *z-index* 属性值，但是没有设置 *position* 属性，*z-index* 无效，所以没有产生层叠上下文，仍然是一个普通的块级元素。 *.child* 的层叠上下文为 html 根元素，*z-index* 小于 *0* 的 *.child* 会被普通的 *block* 块级元素 *.parent* 覆盖。



对于上面的例子，我们只修改 *.box* 的属性，设置 *display: flex*，其余属性和 *DOM* 结构不变。

```css
.box {
  display: flex;
}
```

效果：



<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-17-034835.png" alt="image-20210917114834856" style="zoom:67%;" />



在上面的示例中，当给 *.box* 设置 *display: flex* 时，*.parent* 也会变成一个弹性项目，成为一个层叠上下文元素。于是对于 *.child* 来讲找到的层叠上下文就是 *.parent* 了，而非 *html* 根元素。

根据层叠顺序规则，层叠上下文元素的 *background/border* 的层叠等级小于 *z-index* 值小于 *0* 的元素的层叠等级，所以 *z-index* 值为 *-1* 的*.child* 在 *.parent* 上面。



## 真题解答



- 请简述什么是层叠上下文、什么是层叠等级、什么是层叠顺序

>**层叠上下文概念**
>
>在 *CSS2.1* 规范中，每个盒模型的位置是三维的，分别是平面画布上的 *X* 轴，*Y* 轴以及表示层叠的 *Z* 轴。
>
>一般情况下，元素在页面上沿 *X* 轴 *Y* 轴平铺，我们察觉不到它们在 *Z* 轴上的层叠关系。而一旦元素发生堆叠，这时就能发现某个元素可能覆盖了另一个元素或者被另一个元素覆盖。
>
>**层叠上下文触发条件**
>
>- *HTML* 中的根元素 *HTML* 本身就具有层叠上下文，称为“根层叠上下文”。
>- 普通元素设置 *position* 属性为非 *static* 值并设置 *z-index* 属性为具体数值，产生层叠上下文
>- *CSS3* 中的新属性也可以产生层叠上下文
>
>**层叠等级**
>
>如果两个元素在同一个层叠上下文中，那么层叠等级越大的元素，就越靠前。层叠等级是一个概念，层叠等级的大小可以根据层叠顺序来进行判断。
>
>**层叠顺序**
>
>层叠顺序表示元素发生层叠时按照特定的顺序规则在 *Z* 轴上垂直显示。
>
>说简单一点就是当元素处于同一层叠上下文内时如何进行层叠判断。
>
><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-17-031328.png" alt="image-20210917111327410" style="zoom:50%;" />



------



-*EOF*-








