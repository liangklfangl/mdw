(1)我们的meta部分必须是英文，除了subtile以外

```js
---
category: Components
subtitle: 警告提示
type: Feedback
title: Select
---
```

(2)如果一个组件下面没有demo文件夹，那么表示他是Article组件而不是DemoPage组件。如果在meta中指定了iframe那么会以iframe的形式展示demo

(3)对于我们后台组件的展示方式来说有如下两个方法:

   方法1：将preview的代码使用ReactDOM.render这种写法来展示并插入到我们的DOM中形成预览。对于那些展示的代码使用另外一个元素来显示。此时*不需要iframe*参与


   方法2：你指定一个入口文件，我拿着这个文件来打包后将Select方法iframe的全局变量中。直接调用形成预览效果
