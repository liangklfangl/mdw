---
order: 0
title:
  zh-CN: 选择框
  en-US: Select
---

## zh-CN

多个选择框

## en-US


```jsx
import {Select} from "cms";
const props = {
      url:"http://mytv-test.alibaba.net/common/jsonp/getYoukuPerson.htm",
      style:{
        width:"200px",
        // marginLeft:"50px",
        // marginTop:'200px',
        // backgroundColor:"red",
        // border:'1px solid red'
      },
      method:'post',
      query:{
        fetchKey:"keyword"
      },
      data:["data",'users'],
      //对象路由
      updater:function(item){
       return item.personname;
      },
      //该函数表示选中一行的时候应该选中哪一个字段在文本框中显示
      showHtml:function(rowData){
          const thumburl = rowData.thumburl;
          const personname = rowData.personname;
          const personid = rowData.personid;
          return "<img style='vertical-align:middle' src="+thumburl+"></img>"+"<span>"+personid+"</span>"+"<span style='width:80px;'>"+personname+"</span>"
        }
   }
ReactDOM.render(<Select {...props}/>,mountNode);
```

```html
<div id="react-content"></div>
```

```css
.code-box-demo{
 
}
```

```__back
const domNode = document.getElementById('react-content');
//需要挂载的DOM节点
new Select(domNode,
    {
    url:"http://mytv-test.alibaba.net/common/jsonp/getYoukuPerson.htm",
    style:{
      width:"250px",
      marginLeft:"50px",
      marginTop:'200px',
      // backgroundColor:"red",
      // border:'1px solid red'
    },
    method:'post',
    query:{
      fetchKey:"keyword"
    },
    data:["data",'users'],
    //对象路由
    updater:function(item){
     return item.personname;
    },
    //该函数表示选中一行的时候应该选中哪一个字段在文本框中显示
    showHtml:function(rowData){
        const thumburl = rowData.thumburl;
        const personname = rowData.personname;
        const personid = rowData.personid;
        return "<img style='vertical-align:middle' src="+thumburl+"></img>"+"<span>"+personid+"</span>"+"<span style='width:80px;'>"+personname+"</span>"
      }
    })
```
