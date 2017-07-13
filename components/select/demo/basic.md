---
order: 0
title:
  zh-CN: 选择框
  en-US: Select
---

## zh-CN

用于选中我们的搜索结果。

## en-US

There are primary button, default button, ghost button and dashed button in antd.

`type` can be set as `primary` or `ghost` or `dashed`, in order to create primary button or ghost button or dashed button. If nothing is provided to `type`, we will get default button. Users can tell the significance of button from it's appearance.

Primary button and default button can be used without other button, but ghost button must be used with primary button.

```jsx
import {Select} from "../../index.js";
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

