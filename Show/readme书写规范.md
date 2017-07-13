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

（4）在demo页面里面你可以直接使用import {Select} from "cms",因为在webpack中我已经指定了alias。有一个问题：不是所有的组件展示都需要指定两套代码，一套用于preview，还有一套用于展示给服务端同学的。所以最好有一个开关，指定*是否需要两套代码*。

(5)所有的代码的切割都是通过h2标签来完成的

(6)在页面api的底部加上可能会遇到的问题。。。。。
