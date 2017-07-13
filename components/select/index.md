---
category: Components
type: General
title: Select
subtitle: 搜索框
---

这里必须有文字，否则ReactDOM.findDOMNode不是一个函数错误。

## 何时使用

用于显示动态的搜索结果。

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

