### webpack的启动是通过dora服务器来完成的？
  服务器启动了就会启动webpack开始编译，这个编译和我们的wcf这个tool有关系，因为dora-webpack-plugin会通过wcf来获取通用的配置！然后通过这个配置来开启webpack编译过程

  ### 如果是demo页面，在dora-plugin-antd中，我们会为meta添加id

```js
  meta.id = meta.filename.replace(/\.md$/, '').replace(/\//g, '-');
```

如果是demo页面，我们会将content切割为zh-CN,en-US两部分

```js
  if (chineseIntroStart > -1 ) {
    markdownData.content = {
      'zh-CN': contentChildren.slice(chineseIntroStart + 1, englishIntroStart),
      'en-US': contentChildren.slice(englishIntroStart + 1, introEnd),
    };
  } else {
    markdownData.content = contentChildren.slice(0, introEnd);
  }
```

为markdownData添加highlightedCode和preview属性，其中highlightedCode就是pre标签的属性和code标签内容，preview就是将pre标签下的code标签内的lib包下的组件引用转化到mdw/components文件夹下

```js
  if (sourceCodeObject.isES6) {
    //if we are in jsx syntax
    markdownData.highlightedCode = contentChildren[codeIndex].slice(0, 2);
    //codeIndex is pre tag with jsx attribute, so here we will get pre attribute and code tag
    markdownData.preview = utils.getPreview(sourceCodeObject.code);
  } else {
    const requireString = `require('!!babel!${watchLoader}!${getCorrespondingTSX(meta.filename)}')`;
    markdownData.highlightedCode = {
      __BISHENG_EMBEDED_CODE: true,
      code: `${requireString}.highlightedCode`,
    };
    markdownData.preview = {
      __BISHENG_EMBEDED_CODE: true,
      code: `${requireString}.preview`,
    };
  }
```

previews如下：

```js
'use strict';

const path = require('path');
const pkgPath = path.join(process.cwd(), 'package.json');
const pkgName = require(pkgPath).name;
//Name of our project
const componentsPath = path.join(process.cwd(), 'components');
//utils.getPreview(sourceCodeObject.code);,sourceCode is content of code tag
exports.getPreview = function getPreview(sourceCode) {
  const preview = [
    'pre', { lang: '__react' },
  ];
  preview.push([
    'code',
    sourceCode.replace(`${pkgName}/lib`, componentsPath),
  ]);
  //In code tag of pre with jsx attribute of demo page, we change lib/mdw to cwd/components
  //because our react components are all placed in components folder.
  return preview;
};
```

TypeScript的处理已经被删除了，dora-plugin-antd/lib/loader/watch删除了。添加style、highlightedStyle属性

```js
  const styleNode = getStyleNode(contentChildren);
  if (isStyleTag(styleNode)) {
    markdownData.style = JsonML.getChildren(styleNode)[0];
  } else if (styleNode) {
    const styleTag = contentChildren.filter(isStyleTag)[0];
    markdownData.style = getCode(styleNode) + (styleTag ? JsonML.getChildren(styleTag)[0] : '');
    markdownData.highlightedStyle = JsonML.getAttributes(styleNode).highlighted;
  }
```

如果meta中指定了src，那么我们需要生产demo的html页面，同时将src指定到markdownData上,这里也指定了将jsonml转化为code代码并推送到html页面中

```js
if (meta.iframe) {
    const html = nunjucks.renderString(tmpl, {
      id: meta.id,//meta.filename.replace(/\.md$/, '').replace(/\//g, '-');
      style: markdownData.style,//css content
      script: babel.transform(getCode(markdownData.preview), babelrc).code,
      //transform our jsonml to code
    });
    const fileName = `demo-${Math.random()}.html`;
    fs.writeFile(path.join(process.cwd(), '_site', fileName), html);
    markdownData.src = path.join('/', fileName);
    //src
  }
```


如果URL中不含有demo，那么我们就是经过process-doc处理，处理方式如下:

```js
module.exports = (markdownData) => {
  const contentChildren = JsonML.getChildren(markdownData.content);
  const apiStartIndex = contentChildren.findIndex(node =>
     JsonML.getTagName(node) === 'h2' &&
      /^API/.test(JsonML.getChildren(node)[0])
  );
  //get h2 tag with label of API. Previous is content and latter is API
  if (apiStartIndex > -1) {
    const content = contentChildren.slice(0, apiStartIndex);
    markdownData.content = ['section'].concat(content);
    const api = contentChildren.slice(apiStartIndex);
    markdownData.api = ['section'].concat(api);
  }
  return markdownData;
};

```

下面将jsonml转化为可视化的元素

```js
converters: [
       [node => JsonML.isElement(node) && isHeading(node), (node, index) => {
         const children = JsonML.getChildren(node);
         //get h1-h6 tag`s content
         const sluggedId = generateSluggedId(children);
         //generate id, for example 'when to use' will be replaced with "when-to-use"
         return React.createElement(JsonML.getTagName(node), {
           key: index,
           id: sluggedId,
           ...JsonML.getAttributes(node),
         }, [
           <span key="title">{children.map(child => toReactComponent(child))}<\/span>,
           <a href={`#${sluggedId}`} className="anchor" key="anchor">#<\/a>,
         ]);
       }],
```
