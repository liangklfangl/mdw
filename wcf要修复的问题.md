### 1.我们的dest必须要修复，而不是默认在dest下

### 2.我们添加了Extract-text-plugin和commonchunkplugin后报错没有runtime和isinitial不是函数，所以我在mdw中注释了这两个插件

### 3.我们在wcf中不能使用lf+"loader路径"这种方式，有可能不存在我们的loader被提取到最外层的node_modules

### 4.wcf必须将js和jsx单独配置，否则js可以打包而jsx不可以
http://www.cnblogs.com/qinbb/p/5824952.html，最好Extension中也要添加jsx，否则不会查找jsx的文件类型。我这里没有修改，只是我们从src打包到lib目录下报错了语法错误，而不是我直接require的报错(最后还是修改了，因为我的Components是jsx)

####4.resolve.extensions必须配置，否则我们每次都需要下后缀

####5.使用下面plugin定义变量
https://github.com/liangklfang/universal-react-demo
```js
new webpack.DefinePlugin({
            // http://stackoverflow.com/a/35372706/2177568
            // for server side code, just require, don't chunk
            // use `if (ONSERVER) { ...` for server specific code
            // 服务器端的代码直接require而不是通过if判断
            ONSERVER: false
        })
```

#### 6.不能把loader都全部移动到updateRules中，因为那样我们引用的时候根据getDefault Webpack得不到很多loader,如sass-loader等，如果这样，那么wcf仅仅是一个打包工具而已(已经修复，需要传入第二个参数为true)

#### 7.使用了上面的第二个参数，我们通过指定了common.css，但是这样是无法缓存的！好处是我们可以直接将组建中import的css全部打包到一个单独的文件中！
解决方案：在参数为true的情况下添加html-webpack-plugin就可以了，用户自己指定htmlTemplate参数