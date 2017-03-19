#### 1.如何写一个loader

每一个loader都是一个js模块，该模块导出一个函数。compiler将会调用这个函数，同时把前面loader的结果或者
源文件(第一个loader)传给该loader。在loader中this上下文被添加很多有用的方法可以用于改变该loader的调用方式
成为异步的或者得到查询参数。第一个loader被传入原始数据，compiler期望最后一个loader输出字符串或者Buffer(
其中buffer会被转化为字符串)，_这个字符串或者Buffer将会被作为该模块的js源代码，同时还允许添加一个可选JSON
格式的sourceMap!

在同步模式下可以返回单个结果。如果要返回多个结果就要调用this.callback()。在异步模式下必须调用this.async(),
同时返回this.callback()，然后该loader必须返回undefined同时毁掉callback()。

```js
module.exports = function(content) {
    var callback = this.async();
    //返回this.callback(),如果允许异步就会返回非空
    if(!callback) return someSyncOperation(content);
    someAsyncOperation(content, function(err, result) {
        if(err) return callback(err);
        callback(null, result);
        //该loader没有调用return，同时回调了该函数
    });
};
```


#### 2.下面是loader中this的一部分属性

首先我们给出webpack的配置信息：

```js
  webpackConfig.module.rules.push({
    test: /\.md$/, 
    loaders: ['babel-loader',path.join(loaders,'markdown-data-loader')]
  });
```

<pre>
      target: 'web',
  loadModule: [Function: loadModule],
  context: 'C:\\Users\\Administrator\\Desktop\\mdw',
  loaderIndex: 1,
<!--  这个loader配置的顺序，如这里就是 loaders: ['babel-loader',path.join(loaders,'markdown-data-loader')]
 所以这里是1 -->
  loaders:
   [ { path: 'C:\\Users\\Administrator\\Desktop\\mdw\\node_modules\\babel-loader
\\lib\\index.js',
       query: '',
       options: undefined,
       ident: undefined,
       normal: [Function],
       pitch: undefined,
       raw: undefined,
       data: null,
       pitchExecuted: true,
       normalExecuted: false,
       request: [Getter/Setter] },
     { path: 'C:\\Users\\Administrator\\Desktop\\mdw\\lib\\loaders\\markdown-dat
a-loader.js',
       query: '',
       options: undefined,
       ident: undefined,
       normal: [Function],
       pitch: undefined,
       raw: undefined,
       data: null,
       pitchExecuted: true,
       normalExecuted: true,
       request: [Getter/Setter] } ],
 <!-- loaders表示和这个loader同时配置的loader集合,注意我们的loaders集合的顺序，有利于
  理解remainingRequest。其顺序就是我们在webpack中配置的顺序 -->
  resourcePath: 'C:\\Users\\Administrator\\Desktop\\mdw\\readme.md',
  <!-- 这个loader加载的资源路径，不包含查询字符串? -->
  resourceQuery: '',
<!--   加载资源的时候添加的查询字段，如下的sex就是，得到的结果为"?sex"
  var markdown = require('./readme.md?sex'); -->
  async: [Function: async],
  <!-- 异步loader获取回调函数 -->
  callback: [Function],
  <!-- 异步模式下返回this.callback并要求回调 -->
  cacheable: [Function: cacheable],
  <!-- 默认情况下loader的结果是可以缓存的，传入false那么loader的结果是不允许缓存的
       每一个可以缓存的loader必须有一个确定的结果，当输入和依赖没有改变的时候结果是不会
       变化的。也就是说一个loader所有的依赖必须在this.addDependency中声明。
   -->
  addDependency: [Function: addDependency],
  <!-- 把一个文件添加为模块的依赖从而可以监听他们变化 -->
  dependency: [Function: addDependency],
  <!-- shortcut of addDepencency -->
  addContextDependency: [Function: addContextDependency],
  <!-- 把一个目录作为这个loader的依赖 -->
  getDependencies: [Function: getDependencies],
  getContextDependencies: [Function: getContextDependencies],
  clearDependencies: [Function: clearDependencies],
  <!-- 移除该loader的所有的依赖，包括最初的依赖以及其他loader的依赖 -->
  resource: [Getter/Setter],
  <!-- this.resouce,不是一个函数，包括资源query,如：
    C:\Users\Administrator\Desktop\mdw\readme.md?sex
   -->
  request: [Getter],
  <!-- 添加loader后的完整的资源加载路径：
 C:\Users\Administrator\Desktop\mdw\node_modules\babel-loader\lib\index.
js!C:\Users\Administrator\Desktop\mdw\lib\loaders\markdown-data-loader.js!C:\Use
rs\Administrator\Desktop\mdw\readme.md?sex
   -->
  remainingRequest: [Getter],
  <!-- 见下面的分析 -->
  currentRequest: [Getter],
  <!-- 
   注意：我们在markdown-data-loader中打印的结果，所以currentRequest就是markdown-data-loader处理md文件
  C:\Users\Administrator\Desktop\mdw\li
b\loaders\markdown-data-loader.js!C:\Users\Administrator\Desktop\mdw\readme.md?s
ex-->
  previousRequest: [Getter],
  <!-- 在markdown-data-loader中的处理，获取下一个处理loader。如果是在babel-loader中打印就是""
   C:\Users\Administrator\Desktop\mdw\node_module
s\babel-loader\lib\index.js -->
  query: [Getter],
  <!-- 来自于loader本身的query。path.join(loaders,'markdown-data-loader?name=liangklfangl')此时获取到'?name=liangklfangl' -->
  data: [Getter] }
  <!--在pitch阶段和normal阶段共享的数据对象(暂时未懂)  -->
  fs : [Getter/Setter]
  <!-- 获取compilation对象的inputFileSystem对象 -->
  webpack: [Getter]
  <!-- 如果是webpack编译的那么返回true -->
  target : [Getter]
  <!-- 获取webpack配置中的target属性 -->
  sourceMap : [Getter/setter]
  <!-- 是否要产生sourceMap -->
  minimize :[Getter/setter]
  <!-- 结果是否要压缩 -->
  debug : [Getter/Setter]
  <!-- 在debug模式下设置为true（用处未知） -->
  value : [Getter/Setter]
  <!-- 如果你知道你的模块的执行结果，那么作为单元素数组导出(style-loader就是这个形式) -->
  inputValue ：[Getter]
  <!-- 从上一个loader接受到的数据，如果你会把输入的参数作为模块执行，这个属性可以提升性能-->
  exec : [Function]
  <!--像模块一样执行代码片段 exec(code: string, filename: string) -->
  resolve ：[Function]
  <!-- 如require一样解析一个模块 -->
</pre>

我们现在重点看看上面的remainingRequest，因为这个属性在很多地方都有使用，我们看看[load-utils](https://github.com/webpack/loader-utils/blob/master/lib/getRemainingRequest.js)中如何处理的
就可以大致知道了:

```js
"use strict";
function getRemainingRequest(loaderContext) {
      if(loaderContext.remainingRequest)
            return loaderContext.remainingRequest;
            //如果存在remainingRequest直接返回，这里的loaderContext就是我们在loader中指定的this
      const request = loaderContext.loaders
            .slice(loaderContext.loaderIndex + 1)
         //loaders: ['babel-loader',path.join(loaders,'markdown-data-loader')]
         //那么对于'markdown-data-loader'来说其loaderIndex就是1。此处babel-loader就是0
            .map(obj => obj.request)
        //不管是对于markdown-data-loader还是babel-loader结果都是一样的，都是通过两个loader加载md文件
            .concat([loaderContext.resource]);
       //this.resource表示资源文件
      return request.join("!");
}
module.exports = getRemainingRequest;
```

所以我们的getRemainingRequest就是获取当前loader加载资源之前的请求字符串，如果获取我们上面配置的babel-loader
的结果将会得到下面的结果：

```js
 C:\Users\Administrator\Desk
top\mdw\lib\loaders\markdown-data-loader.js?name=liangklfangl!C:\Users\Administr
ator\Desktop\mdw\readme.md?sex
```

但是如果在markdown-data-loader中打印就会是"C:\Users\Administrator\Desktop\mdw\readme.md?sex",也就是
仅仅包含资源，而不包含具体的loader!

### 3. 'raw' loader

默认情况下，资源文件会被当做utf-8的字符串类型，同时作为字符串传递给我们的loader。默认情况
raw是false,通过设置为true，那么该loader就会被传入Buffer。每个loader都可以把资源按照字符串或者
Buffer传递，Compiler会将他们在各个loader中转换。

假如我们使用上面的markdown-data-loader来加载md文件，同时我们的loader加载的内容为:

<pre>
     ### webpack的启动是通过dora服务器来完成的？
  服务器启动了就会启动webpack开始编译，这个编译和我们的wcf这个tool有关系，因为dora-webpack-plugin会通过wcf来获取通用的配置！然后通过这个配置来开启webpack编译过程 
</pre>

此时我们的loader为:

```js
module.exports = function(content) {
    // assert(content instanceof Buffer);
    // return someSyncOperation(content);
    // return value can be a `Buffer` too
    // This is also allowed if loader is not "raw"
};
module.exports.raw = true;
```

此时我们获取到的content将会是如下的Buffer格式:

<pre>
 <Buffer 23 23 23 20 77 65 62 70 61 63 6b e7 9a 84 e5 90 af e5 8a
a8 e6 98 af e9 80 9a e8 bf 87 64 6f 72 61 e6 9c 8d e5 8a a1 e5 99 a8 e6 9d a5 e5
 ae 8c e6 88 ... >   
</pre>

### 4. pitching loader

loaders的调用顺序都是从右到左的，但是有时候我们的loader不会关心前面的loader的处理的结果或者最初的原始资源，他们仅仅关系metadata。一个loader中的pitch方法总是从左到右调用的，而且这个调用是在loader真实调用之前的。

如果一个loader在pitch方法中返回了一个结果，这时候就会发生变化。那么处于该loader之后配置的loader都会被跳过(也包括当前loader本身)，此时只会继续调用左边的loaders。注意：data是可以在本loader的pitch和真实调用阶段共享的！


```js
module.exports = function(content) {
  return  `module.exports ="hello world";`;
    // return someSyncOperation(content, this.data.value);
};
module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  //此处remainingRequest是" C:\Users\Administrator\Desktop\mdw\readme.md?sex"
  //此处procedingReqest是"C:\Users\Administrator\Desktop\mdw\node_modules\babel-loader\lib\index.js"
    if(false) {
      //如果这里执行了return并返回数据，那么我们该loader不会执行而是直接跳过，也就是说我们上面导出的
      //module.exports并不会执行了，但是我们上面webpack配置的babel-loader还是会继续调用的
       // return "module.exports = require(" + JSON.stringify("-!" + remainingRequest) + ");";
       return "hello";
    }
    data.value = 42;
    //pitch方法中设置的data可以在该loader中通过this.data访问,但是此处在其他的loader中无法访问，如babel-loader
};
     
```

比如下面的例子：

```js
webpackConfig.module.rules.push({
    test: /\.md$/, 
    loaders: ['babel-loader',path.join(loaders,'markdown-data-loader'),path.join(loaders,'markdown-data-loader1')]
  });
```

如果在markdown-data-loader的pitch方法中返回一个结果，那么markdown-data-loader1压根不会执行!