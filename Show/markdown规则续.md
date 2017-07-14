---
category: Components
type: Compatiable
title: Select
subtitle: 搜索框
---

其中category指定是否是组件，可以是Components或者不填。type表示在该category属于哪一种类型，比如我们将后台兼容的组件category设置为"Compatiable",title表示组件标题，而subtitle表示子标题。

## 何时使用

这里的内容用于描述你这个组件的使用场景。

## 前提条件
第一步：引入我们的js/css文件

```html
<link rel="stylesheet" type="text/css" href="http://g-assets.daily.taobao.net/tvadmin/uniform-ui/1.0.2/Select/index.css"/>
 <script type="text/javascript" src="http://g-assets.daily.taobao.net/tvadmin/uniform-ui/1.0.2/vendor.js"></script>
 <script type="text/javascript" src="http://g-assets.daily.taobao.net/tvadmin/uniform-ui/1.0.2/Select/index.js"></script>
```

线上地址为:

```html
<link rel="stylesheet" type="text/css" href="http://g.alicdn.com/tvadmin/uniform-ui/1.0.2/Select/index.css"/>
 <script type="text/javascript" src="http://g.alicdn.com/tvadmin/uniform-ui/1.0.2/vendor.js"></script>
<script type="text/javascript" src="http://g.alicdn.com/tvadmin/uniform-ui/1.0.2/Select/index.js"></script>
```

第二步:我们的Select已经被挂载到window对象上，可以直接使用，请参加下面的例子。

## API

| 参数      | 说明                                                                                                                                                        | 类型     | 默认值                 |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|------------------------|
| url       | 请求访问的URL                                                                                                                                               | string   | 无                     |
| style     | 用于控制搜索框的样式。对于数字形式的属性可以写成字符串，但是不建议这样。如width:300px 建议写成width:300                                                     | object   | {width:200,height:100} |
| query     | 用于向服务端发送请求时候的关键字，如query:{fetchKey:"keyword"}会被封装到url后得到如下url:     http://example.com?keyword=value，其中value表示文本框输入的值 | object   | 无                     |
| showHtml  | 是一个函数，其参数为搜索结果中显示的每一条数据对象。你可以通过这个数据对象拼接你需要展示的html字符串并返回                                                  | function | 无                     |
| data      | 通过该数组获取服务端返回值中我们需要处理的数据,如["data",'users']将会获取服务端res.data.users中数据                                                         | array    | 无                     |
| updater   | 接受一个参数表示搜索框要显示的每一行的数据对象，你返回这个对象的一个属性。那么当你选中一个结果的时候文本框中就会显示对象的该属性值                          | function | 无                     |
| invokeAdd | 静态方法，通过Select.invokeAdd调用。当你需要动态创建DOM元素并需要该DOM有Select的功能时调用。该方法必须在操作DOM之前调用才有效                               | function | 无                     |


### 遇到的问题

(1)传入的mountNode节点不能是空标签

```html
<div/>
<!-- 替换为如下内容 -->
<div></div>
```

(2)Select.invokeAdd在操作DOM之前调用

```js
 Select.invokeAdd([".person_tips",".role_tips",".company_tips"]);
 //下面开始操作DOM
 $('#container').append('<div class="person_tips" data-name="name1" placeholder="value1"></div><div class="role_tips" data-name="name2" data-value="add1"></div><div class="company_tips" data-name="name3" placeholder="value3" data-value="add2"></div>');
```


