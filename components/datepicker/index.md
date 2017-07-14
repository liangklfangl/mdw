---
category: Components
type: Compatiable
title: DatePicker
subtitle: 日期选择
---

这里必须有文字，否则ReactDOM.findDOMNode不是一个函数错误。

## 何时使用

用于选择一个时间范围。

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

| 参数         | 类型       | 说明         | 默认值            |
|--------------|------------|--------------|-------------------|
| disabled     | true/false | 是否禁用     | false             |
| allowClear   | true/false | 是否可以取消 | true              |
| disabledDate | function   | 灰色显示时间 | 无                |
| onOpenChange | function   | 打开改变     | 无                |
| placeholder  | 占位符     | 占位符       | 开始时间/结束时间 |
| showTime     | true/false | 是否显示时间 | true              |
| name         | string     | 组件name     | mydate            |
| onChange     | function   | 改变时间触发 | 无                |

