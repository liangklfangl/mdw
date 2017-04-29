### 1.run
```js
node ./bin/mdw --start --configFile ./theme/index.js --webpackFile ./webpack.config.js 
 //不要添加dev
```
### 2.注意
如果你需要将css单独抽取出来，然后加载在页面中，那么不能使用dev模式，因为它不会将css抽取出来，而会通过style-loader内联到页面中,所以下面这句代码是可以删除的:
```js
 if (isDevMode(program)) {
      commonConfig.plugins.push(new _extractTextWebpackPlugin2.default({
        filename: 'etp-[contenthash].css',
        allChunks: false,
        disable: false,
        ignoreOrder: false
        //Disables order check (useful for CSS Modules!),
      }));
    } 
```

