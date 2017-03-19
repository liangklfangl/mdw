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
