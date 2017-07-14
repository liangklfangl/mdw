---
category: Components
type: Compatiable
title: Notice
subtitle: 文字轮播
---

用于展示一个滚动的文字栏。

## 何时使用

当需要设置文字滚动轮播的时候使用。

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

| 参数     | 类型    | 说明               | 默认值 |
|----------|---------|--------------------|--------|
| autoplay | boolean | 是否默认滚动       | false  |
| vertical | boolean | 垂直显示           | false  |
| dots     | boolean | 是否显示面板指示点 | false  |
| speed    | number  | 滚动速度           | 500    |
