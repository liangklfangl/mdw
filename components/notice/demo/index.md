---
order: 6
title:
  zh-CN: 旋转展示
  en-US: Notice
---

## zh-CN

用于展示文字轮播效果,可以查看[页面顶部的轮播](http://tvadmin-test.alibaba.net/#?dataid=100017273)。

## en-US

```jsx
import {Notice} from "cms";
const data = ['hello', '你好', 'bye'];
const params = {
    autoplay: 'true',
    vertical: 'true',
    dots: false,
    speed: 500
  };
ReactDOM.render(<Notice data={data} params={params}/>);
```

```__back
// write your demo code here, below is an example
new Notice(document.getElementById('app'),
  //第一个参数表示需要挂载的DOM
  ['hello', '你好', 'bye'],
  //第二个参数表示滚动的文字列表
   {
 //这里的配置请参考下面API表格
    autoplay: 'true',
    vertical: 'true',
    dots: false,
    speed: 500
  });
```

```html
<div id="app"></div>
```
