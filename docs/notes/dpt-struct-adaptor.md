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
title: 适配器模式
order: 18
---

# 适配器模式

**适配器**是一种**结构型**设计模式，它能**使接口不兼容的对象能够相互合作**。

在我们的生活中，这种适配器的模式比比皆是。

例如：港式的电器插头比大陆的电器插头体积要大一些。如果从香港买了一台电脑，我们会发现充电器无法插在家里的插座上，为此而改造家里的插座显然不方便，所以我们需要一个适配器。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-27-095321.png" alt="image-20240327175321058" style="zoom: 30%;" />

再比如，在以前的电脑上，PS2 接口是连接鼠标、键盘等其他外部设备的标准接口。但随着技术的发展，越来越多的电脑开始放弃了 PS2 接口，转而仅支持 USB 接口。所以那些过去生产出来的只拥有 PS2 接口的鼠标、键盘、游戏手柄等，需要一个 USB 转接口才能继续正常工作，这是 PS2-USB 适配器诞生的原因。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-27-095524.png" alt="image-20240327175523609" style="zoom:20%;" />

因此，我们可以看出适配器的主要作用，就是**<u>解决两个软件实体间的接口不兼容的问题</u>**。使用适配器模式之后，原本由于接口不兼容而不能工作的两个软件实体可以一起工作。



## 场景描述

假如你正在开发一款股票市场监测程序，它会从不同来源下载 XML 格式的股票数据，然后向用户呈现出美观的图表。

在开发过程中，假设我们要用到第一个第三方的智能分析库，这个库可以对股票数据进行分析，但是这个库只接收 JSON 格式的数据。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-28-012646.png" alt="image-20240328092646084" style="zoom:50%;" />

在这种情况下，我们不可能去修改现有的代码，所以的解决的方案就是添加一个适配器，该适配器的作用就是将 XML 格式的数据转换为 JSON 格式的数据。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-28-012934.png" alt="image-20240328092933395" style="zoom:50%;" />



## 具体类图

适配器模式的类图如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-27-095700.png" alt="image-20240327175700144" style="zoom: 50%;" />

1. 客户端：包含当前整个程序的业务逻辑
2. 客户端接口：其他的类和客户端代码进行合作的时候必须遵循的约束
3. 服务类：往往就是来自于第三方的功能类。这个功能类往往在接口上面和客户端是不兼容的，导致客户端是没有办法直接调用功能类的。
4. 适配器：作为一个中间的桥梁，对数据格式作出一个转换操作。
5. 回到客户端，现在有了适配器之后，客户端直接和适配器进行交互，适配器和服务类进行交互。



详细代码请参阅随堂课堂代码。



## 前端中适配器模式的应用

假设我们使用 Google 地图和 Baidu 地图来展示地图信息，两个地图服务商都提供了一个名为 show 的方法，那么我们的 render 方法也就非常简单，在内部直接调用 show 方法进行渲染即可：

```js
const googleMap = {
  show: function () {
    console.log("开始渲染谷歌地图");
  },
};
const baiduMap = {
  show: function () {
    console.log("开始渲染百度地图");
  },
};
const renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show();
  }
};
renderMap(googleMap); // 输出：开始渲染谷歌地图
renderMap(baiduMap); // 输出：开始渲染百度地图
```

现在，假设有一个第三方地图，该地图提供的接口方法名不叫 show，而是 display

```js
const googleMap = {
  show: function () {
    console.log("开始渲染谷歌地图");
  },
};
const baiduMap = {
  show: function () {
    console.log("开始渲染百度地图");
  },
};
const gaodeMap = {
  display: function () {
    console.log("开始渲染百度地图");
  },
}

// 通用的渲染方法
const renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show();
  }
};

// 那么接下来我们就需要创建一个适配器
const gaodeMapAdapter = {
  show: function(){
    return gaodeMap.display();
  }
}

renderMap(gaodeMapAdapter);
```



例如再来看一个例子：

假设我们正在编写一个渲染广东省地图的页面。目前从第三方资源里获得了广东省的所有城市以及它们所对应的 ID，并且成功地渲染到页面中：

```js
// 对应的数据格式
const guangdongCity = [
  {
    name: "shenzhen",
    id: 11,
  },
  {
    name: "guangzhou",
    id: 12,
  },
];
const render = function (fn) {
  console.log("开始渲染广东省地图");
  // 具体逻辑省略，但是具体的渲染逻辑依赖于
  // [{name: "shenzhen", id: 11}, {name: "guangzhou", id: 12}] 这种数据结构
};
render(guangdongCity);
```

但是过了一段时间后，你发现上面的数据缺少了一些城市信息，同时你在网上找到了一份更全面的数据信息，但是这份更全面的数据信息，格式和之前有所不同：

```js
const guangdongCity = {
  shenzhen: 11,
  guangzhou: 12,
  zhuhai: 13,
};
```

这里要解决上面的问题，我们就需要添加一个数据格式转换的适配器，对数据格式进行转换，而非去改渲染逻辑。

```js
const guangdongCity = {
  shenzhen: 11,
  guangzhou: 12,
  zhuhai: 13,
};

const render = function (fn) {
  console.log("开始渲染广东省地图");
  // 具体逻辑省略，但是具体的渲染逻辑依赖于
  // [{name: "shenzhen", id: 11}, {name: "guangzhou", id: 12}] 这种数据结构
};

const adapter = function(oldAddressFormat){
  // 进行一个数据格式的转换
  const address = [];
  Object.entries(oldAddressFormat).forEach(([cityName, cityId])=>{
    address.push({
      name: cityName,
      id: cityId
    })
  });
  return address;
}

render(adapter(guangdongCity));
```

