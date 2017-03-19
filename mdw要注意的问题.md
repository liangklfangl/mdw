### 1.在dora-plugin-webpack中配置的query的config由于指定配置文件，默认是cwd/webpack.config.js，这个文件可以到导出一个对象也可以导出一个函数，如果导出对象那么直接作为webpack配置参数，如果导出一个函数那么会把从wcf中获取到的commonconfig进行更新，也就是调用wcf/mergeCustomConfig.js

### 2.react-router怎么和服务器联系起来？进而监听浏览器的地址栏？？？？？也就是我们需要一个html页面加入我们的打包后的js文件啊，该文件里面有代码监听URL变化！！！

###3.这个是启动了服务器，和服务器关联起来的就是通过history-api-callback来完成的，直接的URL访问都返回html页面