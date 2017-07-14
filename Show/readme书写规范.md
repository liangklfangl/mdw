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

(6)demo页面中的#zh-cn下面的内容必须顶格，否则会解析出来一个p。其实原因是没有调用下面的方法:

```js
 {utils.toReactComponent(localContent)}
```
同时也要如下处理:

```js
 markdownData.content = {
      'zh-CN': ['section'].concat(contentChildren.slice(chineseIntroStart + 1, englishIntroStart)),
      'en-US': ['section'].concat(contentChildren.slice(englishIntroStart + 1, introEnd)),
    };
    //调用concat
```

(7)纯jQuery组件的解决方案:

  方案1：对于jQuery的插件，我们需要在meta中添加jQuery:true,然后我们不会render，你也不需要提供jsx部分，我会直接将__back里面的代码插入到一个div中进行展示。而且我会*在后台自己从npm中下载jQuery*
  方案2：在meta中添加iframe:true,我来提供一个htmlTemplate，里面有jQuery的链接，即window.jQuery是存在的。但是，如何解决别人乱写getElementById的情况？这种情况我直接 *严格规定id必须是app*。其实id必须是可以配置的，我在demo的template中是如下写的:

```html
 <div id="{{ id }}"></div>
```

(9)对于以前的组件，直接wcf生产common.js/index.js/common.css拷贝到我们的markdown就可以了

(8)添加代码格式化的功能，防止别人写的demo代码全部是随意拷贝进来的。https://github.com/liangklfang/js-beautify


