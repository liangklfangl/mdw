### 1.在dora-plugin-webpack中配置的query的config由于指定配置文件，默认是cwd/webpack.config.js，这个文件可以到导出一个对象也可以导出一个函数，如果导出对象那么直接作为webpack配置参数，如果导出一个函数那么会把从wcf中获取到的commonconfig进行更新，也就是调用wcf/mergeCustomConfig.js

### 2.react-router怎么和服务器联系起来？进而监听浏览器的地址栏？？？？？也就是我们需要一个html页面加入我们的打包后的js文件啊，该文件里面有代码监听URL变化！！！

###3.这个是启动了服务器，和服务器关联起来的就是通过history-api-callback来完成的，直接的URL访问都返回html页面

### 4.判断对某一个文件类型的loader

```js
  if (loader.test.toString() !== '/\\.md$/') return;
```

### 5.为了实现即时预览的效果，我们开发了一个自己的loader

```js
module.exports = (config) => {
  return {
    webpackConfig(webpackConfig) {
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.test.toString() !== '/\\.md$/') return;
        const babelIndex = (rule.loaders||[]).indexOf('babel');
        //In updateWebpackConfig, we use loaders array for markdown file
        const query = generateQuery(config);
        //We passed our query , lang=__react to jsonml-react-loader
        rule.loaders.splice(babelIndex + 1, 0, path.join(__dirname, `jsonml-react-loader?${query}`));
      });
      return webpackConfig;
    },
  };
};

```

### 6.dora-plugin-preview中，我们会首先将import和ReactDOM.render去掉，得到ast对象,同时返回一个函数对象，函数名称为jsonmlReactloader方法，调用这个方法会得到去掉import和ReactDOM.render后构建得到的AST对象。更新了AST后，我们再重新添加import，并将ast转化为code，最后将code交给babel-loader来处理。
注意，我们这个loader将jsonml进行处理，更新了ast，并重新转化为code，同时因为我们返回了函数，所以node的type就是function。所以在browser.js中做了如下处理:

```js
'use strict';
var React = require('react');
module.exports = function() {
  return {
    converters: [
      [
        function(node) { return typeof node === 'function'; },
        //in jsonml, we care about node of function because in jsonml-react-loader, we return a function
        function(node, index) {
          return React.cloneElement(node(), { key: index });
          //we invoke function to get ReactElement
        },
      ],
    ],
  };
};

```

#### preview时候的一开始是字符串，后面是如何转化为函数的~~
