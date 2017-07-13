const path = require("path");
module.exports = {
  module: {
    noParse: [/jquery/],
    rules: [{
            test: require.resolve('antd'),
            //此时我们window.["antd/lib"]与window.["ANTD/lib"]都是存在的
            use: [{
                loader: require.resolve('expose-loader'),
                options: 'antd/lib'
            },{
                loader: require.resolve('expose-loader'),
                options: 'ANTD/LIB'
            },
            //此时iframe可以通过window.parent.antd来获取到父页面的antd对象
            {
                loader: require.resolve('expose-loader'),
                options: 'antd'
            }]
        },
         {
            test: require.resolve('react'),
            //此时我们window.["antd/lib"]与window.["ANTD/lib"]都是存在的
            use: [{
                loader: require.resolve('expose-loader'),
                options: 'React'
            },
            {
                loader: require.resolve('expose-loader'),
                options: 'react'
            }]
        },
        {
            test: require.resolve('react-router'),
            //此时我们window.["antd/lib"]与window.["ANTD/lib"]都是存在的
            use: [{
                loader: require.resolve('expose-loader'),
                options: 'ReactRouter'
            },
            {
                loader: require.resolve('expose-loader'),
                options: 'reactRouter'
            }]
        },
        {
            test: require.resolve('react-dom'),
            //此时我们window.["antd/lib"]与window.["ANTD/lib"]都是存在的
            use: [{
                loader: require.resolve('expose-loader'),
                options: 'ReactDOM'
            },{
                loader: require.resolve('expose-loader'),
                options: 'react-dom'
            }]
        }]
   },

   //此时我们通过require("antd");就会将antd的所有的组件都暴露到window对象上
   resolve: {
      alias: {
        "antd" :"antd",
         "cms": path.join(__dirname,"./components/index.js")
      },
    },
	 devServer:{
      publicPath:'/',
      open :true,
      port:8090,
      // contentBase: path.join(process.cwd(), "public"),
      // webpack-dev-server中的html无法访问外部的html页面或者其他静态资源
      historyApiFallback: {
	     rewrites: [
  	    { from: "/docs/react/common.js", to: '/common.js' },
  	    { from: "/docs/react/index.js", to: '/index.js' },
         { from: "/docs/pattern/common.js", to: '/common.js' },
        { from: "/docs/pattern/index.js", to: '/index.js' },
         { from: "/docs/resource/common.js", to: '/common.js' },
        { from: "/docs/resource/index.js", to: '/index.js' },
         { from: "/docs/spec/common.js", to: '/common.js' },
        { from: "/docs/spec/index.js", to: '/index.js' },
        { from: "/components/alert/common.js", to: '/common.js' },
        { from: "/components/alert/index.js", to: '/index.js' },
         { from: "/components/button/common.js ", to: '/common.js' },
        { from: "/components/button/index.js", to: '/index.js' }
	     ]
	    },
      contentBase:false,
      hot:false
    }
}
