### 下面是开发中遇到的问题
Can not read 0 of undefined。 来自于  {utils.toReactComponent(demoCodeForBack)}，其中demoCodeForBack在有些情况下是undefined，所以调用toReactComponent报错了

### ReactDOM.findDOMNode is not funciton

```js
//以前写成了process.env.NODE_ENV !=== 'development'所以a11y本身抛出错误了
 if (process.env.NODE_ENV === 'development'){
        a11y(React);
    }
//a11y这里的挂载process.env.NODE_ENV要重新修改下！！！目前取消对于这个插件的支持
```

