---
order: 6
title:
  zh-CN: 日期选择
  en-US: DatePicker
---

## zh-CN

用于提示用户选择一个开始日期和结束日期。

## en-US

```jsx
//    "react-dom": "^15.4.2",
//    "react": "^15.6.1",
import {DatePicker} from "cms";
let type = 'rangepicker';
let params = {
 disabled:false,
 allowClear : true,
 disabledDate:function(current) {
  // can not select days before today and today
    return current && current.valueOf() < Date.now();
 },
 onOpenChange:function(status){

 },
 placeholder:['开始时间','结束时间'],
 showTime:true,
 name:"mydate",
 onChange(dates , dateStrings){
        console.log(dates);
        console.log(dateStrings);
 }
}
ReactDOM.render(<DatePicker type={type} params={params}/>);
```

```__back
let type = 'rangepicker';
let params = {
 disabled:false,
 allowClear : true,
 disabledDate:function(current) {
  // can not select days before today and today
    return current && current.valueOf() < Date.now();
 },
 onOpenChange:function(status){

 },
 placeholder:['开始时间','结束时间'],
 showTime:true,
 name:"mydate",
 onChange(dates , dateStrings){
        console.log(dates);
        console.log(dateStrings);
 }
}
const mountNode = document.getElementById('app');
mountNode.innerHTML = `
            <div id="J_DateWrap">
                <input name="startdate" type="hidden">
                <input name="enddate" type="hidden">
            </div>
`;
const el = document.getElementById('J_DateWrap');
new rc_DatePicker(el, type, params);
```

```html
<div id="app"></div>
```
