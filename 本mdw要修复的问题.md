#### 1.html中不要写死publicPaht为'assets'

#### 2.getConfig不应该使用Object.assign方法，可以使用webpack-merge

####3.resolvePlugins中修改为了getOptions是否又问题

#### 4.koa-webpack-dev-middleware是作为dora-webpack-plugin插件的方式，所以也不会在dest目录下产生文件而是直接在内容中的！不过其在dora-plugin-webpack的middleware阶段的publicPath要注意。其决定着是否可以访问到具体的文件

#### 5.ssr分析

```js
'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router');
const createElement = require('./utils/create-element');
module.exports = function ssr(routes, url, callback) {
  ReactRouter.match({ routes, location: url }, (error, redirectLocation, renderProps) => {
    if (error) {
      callback('');
    } else if (redirectLocation) {
      callback(''); 
    } else if (renderProps) {
      const content = ReactDOMServer.renderToString(
        <ReactRouter.RouterContext {...renderProps} createElement={createElement} \/>
      );
      callback(content);
    } else {
      callback(''); 
    }
  });
};
```


#### 6.继续分析react-router的nextState

#### 7.getComponent是在createElement调用之前被调用的！

    每一个组件在调用collect方法的时候，会将nextProps通过dynamicKey封装到组件上，然后通过createElement创建组件的时候会直接封装到组件的prop上。

```js
const React = require('react');
module.exports = function createElement(Component, props) {
  const dynamicPropsKey = props.location.pathname;
  return <Component {...props} {...Component[dynamicPropsKey]} />;
};
```

传入collect方法的参数为:

```js
 Object.assign({}, nextState, {
        data: data.markdown,
        picked: data.picked,
        pageData,
        //page data is for special html page based on url
        utils,
        //get method is from exist.get
      })
```

#### 8.左侧和导航的框架数据，以及右侧的内容数据是如何更新的

#### 9.exist.js如果传入的是一个空数组，那么原样返回对象

```js
var exist = require('exist.js');
var obj ={name:'qinliang',sex:'male'};
const pageData = exist.get(obj, [""]);
console.log('pageData:',pageData);
```

这也就是告诉我们，如果当你访问localhost:8080/的时候,其实URL得到的是[""]，此时pageData和data就是一样的~

### 10.pick函数

```js
 pick: {
    components(markdownData) {
      const filename = markdownData.meta.filename;
      if (!/^components/.test(filename) ||
          /\/demo$/.test(path.dirname(filename))) return;
      return {
        meta: markdownData.meta,
      };
    },
    changelog(markdownData) {
      if (/CHANGELOG/.test(markdownData.meta.filename)) {
        return {
          meta: markdownData.meta,
        };
      }
    }
  }
```

此时我们的pick对象有components和changelog两个属性。

#### 11.研究我们的React的动画效果

#### 12.学习@import
```js
@import '../../../components/style/themes/default.less';
@import './common';
@import './header';
@import './footer';
@import './home';
@import './page-nav';
@import './markdown';
@import './resource';
@import './responsive';
@import './preview-img';
@import './toc';
@import './not-found';
@import './highlight';
@import './demo';
@import './colors';
@import './mock-browser';
@import './new-version-info-modal';
@import './motion';
```

#### 13.修改getModuleData方法

```js
 const moduleData = moduleName === 'components' || moduleName === 'docs/react' ||
          moduleName === 'changelog' || moduleName === 'changelog-cn' ?
          [...props.components, ...props['docs/react'], ...props.changelog] :
          props.picked[moduleName];
```


#### 14.this.context存在问题，获取不到this.context.locale,'hello  world'全部要替换过来

#### 15.markdown文件规则，只要记住toplevel是参数Menu.Item,其他的是Menu.SubMenu

例如，在一级导航中，我们只有components会被产生为我们的Menu.SubMenu,其他的都是Menu.Item,而同时components下又会产生Menu.ItemGroups。所以，如果你需要添加category，只要修改getModuleData，同时产生一个新的category就可以了！

```js
 <Menu.MenuItem>
 </Menu.MenuItem>,
  <Menu.SubMenu>
  <Menu.ItemGroup>
    <Menu.MenuItem>
    </Menu.MenuItem>
  </Menu.ItemGroup>
  </Menu.SubMenu>
```

第一级category为：
```js
 const category = (meta.category && meta.category[locale]) || meta.category || 'topLevel';
```

第二个type为：

```js
   const type = meta.type || 'topLevel'; 
    if (!menuItems[category][type]) {
      menuItems[category][type] = [];
    }
    menuItems[category][type].push(meta);
```

```js
  generateSubMenuItems(obj) {
    const topLevel = (obj.topLevel || []).map(this.generateMenuItem.bind(this, true));
    //Get second-order toplevel item(not ItemGroup), and second-order ItemGroup items
    const itemGroups = Object.keys(obj).filter(isNotTopLevel) 
      .sort((a, b) => config.typeOrder[a] - config.typeOrder[b])
       //ItemGroups只有当没有指定type和category才会产生，否则是不可能产生的！
      //This key is second-order category
      .map((type, index) => {
        const groupItems = obj[type].sort((a, b) => {
          return a.title.charCodeAt(0) -
          b.title.charCodeAt(0);
          //We sort third-order category by title , here type is second-order category
        }).map(this.generateMenuItem.bind(this, false));
        return (
          <Menu.ItemGroup title={type} key={index}>
            {groupItems}
            {/*Here we return ItemGroup object*/}
          <\/Menu.ItemGroup>
        );
      });
    //Here itemGroups will generate if you do not define category and type in markdown files!
    return [...topLevel, ...itemGroups];
  }
```

#### 16.EditButton如何将filename转化到github上某一个markdown文件的修改

#### 17.这里都是采用了css module了，也就是说我们默认就支持了css  module了，因此所有下面的代码都是无效的：

```js
require('../../static/highlight.less');
require("../../static/prism.js");
```

#### 18.将less变量放在一个单独的文件中引入。每一个页面的less文件都单独在一个页面中单独@import,这样css也就可以模块化了！在wcf中，我们添加判断了，可以决定是否使用css module:

```js
     {
          test(filePath) {
            return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
          },
          loader: ExtractTextPlugin.extract(
            `${require.resolve('css-loader')}?sourceMap&-autoprefixer!` +
            `${require.resolve('postcss-loader')}!` +
            `${require.resolve('less-loader')}?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
          ),
        },
        {
          test: /\.module\.less$/,
          loader: ExtractTextPlugin.extract(
            `${require.resolve('css-loader')}?` +
            `sourceMap&modules&localIdentName=[local]___[hash:base64:5]&-autoprefixer!` +
            `${require.resolve('postcss-loader')}!` +
            `${require.resolve('less-loader')}?` +
            `{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
          ),
        },
```

也就是说，如果你需要require的时候支持css module,那么应该在命名css或者less的时候添加module.css/module.less后缀，此时只能采用require而不能是import!

#### 19.我们的hightlighte本身在pre标签的属性上，但是最后是通过hightlight的browser.js来完成转化的

#### 20.所有的components下的组件命名必须是小写的，因为这是和URL相关的 