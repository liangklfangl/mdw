const fs = require('fs');
const path = require('path');
const JsonML = require('jsonml.js/lib/utils');
const Prism = require('node-prismjs');
const nunjucks = require('nunjucks');
const util = require("util");
nunjucks.configure({ autoescape: false });
const babel = require('babel-core');
const babelrc = {
  presets: ['es2015', 'react'].map(m =>
     require.resolve(`babel-preset-${m}`)
  ), 
  plugins: [
    require.resolve('babel-plugin-transform-runtime'),
    // require.resolve("babel-plugin-add-module-exports"),
    // 因为我们是在一个markdown文件中写的，所以不需要这个插件
     [ require.resolve('babel-plugin-import'), {
      libraryName: 'antd',
      style: 'css'
    }]
  ]
};
//babelrc file
const tmpl = fs.readFileSync(path.join(__dirname, 'template.html')).toString();
const utils = require('./utils');

//是style标签的内容
function isStyleTag(node) {
  return node && JsonML.getTagName(node) === 'style';
}

/**
 * [getCode We get content of code tag]
 * @param  {[type]} node [description]
 * @return {[type]}      [description]
 */
function getCode(node) {
  return JsonML.getChildren(
    JsonML.getChildren(node)[0]
  )[0];
}

/**
 * [getChineseIntroStart description]
 * @param  {[type]} contentChildren [content part of markdownData, meta part eliminated]
 * @return {[type]}                 [return Index of h2 tag with 'zh-CN' as label of children]
 */
function getChineseIntroStart(contentChildren) {
  return contentChildren.findIndex(node =>
     JsonML.getTagName(node) === 'h2' &&
      JsonML.getChildren(node)[0] === 'zh-CN'
  );
}

/**
 * [getEnglishIntroStart Get h2 with label of 'en-US']
 * @param  {[type]} contentChildren [description]
 * @return {[type]}                 [description]
 */
function getEnglishIntroStart(contentChildren) {
  return contentChildren.findIndex(node =>
     JsonML.getTagName(node) === 'h2' &&
      JsonML.getChildren(node)[0] === 'en-US'
  );
}

/**
 * [getCodeIndex We will get jsx part, because English and Chinese version commonly use one code part]
 * @param  {[type]} contentChildren [description]
 * @return {[type]}                 [description]
 */
function getCodeIndex(contentChildren) {
  return contentChildren.findIndex(node =>
     JsonML.getTagName(node) === 'pre' &&
      JsonML.getAttributes(node).lang === 'jsx'
  );
}

function getCorrespondingTSX(filename) {
  return path.join(process.cwd(), filename.replace(/\.md$/i, '.tsx'));
}

/**
 * [getSourceCodeObject In getCodeIndex method, we only care about jsx syntax, so if codeIndex>-1, then we are now in jsx syntax]
 * @param  {[type]} contentChildren [description]
 * @param  {[type]} codeIndex       [description]
 * @return {[type]}                 [description]
 */
function getSourceCodeObject(contentChildren, codeIndex) {
  if (codeIndex > -1) {
    return {
      isES6: true,
      code: getCode(contentChildren[codeIndex]),
      //code is content of code tag
    };
  }
  return {
    isTS: true,
  };
}

/**
 * 返回style标签或者<pre language="css">两种Node，但是只是返回第一个
 */
function getStyleNode(contentChildren) {
  return contentChildren.filter(node =>
     isStyleTag(node) ||
      (JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'css')
  )[0];
}

/**
 * [description]
 *这里的markdownData指的是前一个plugin处理后得到的jsonml。这里是真实的markdown文件内容，而不是markdown
 *文件树
 *  const markdownData = markTwain(fileContent);
 * 如路径为./components/button/demo/basic.md，这是一个独立的markdown文件，通过第一个loader会转化为文件树，即
 * basic:require("components/button/demo/basic.md"),而真实加载markdown文件时候会封装到这里所谓的markdownData对象上
 * 所以此处的markdownData值得就是如basic对象,button-group,disabled内容
 */
module.exports = (markdownData, isBuild) => {
  const meta = markdownData.meta;
  meta.id = meta.filename.replace(/\.md$/, '').replace(/\//g, '-');
  // Should throw debugging demo while publish.
  if (isBuild && meta.debug) {
    return { meta: {} };
  }
  // Update content of demo.
  const contentChildren = JsonML.getChildren(markdownData.content);
  //我们得到Demo页面的content部分
  const chineseIntroStart = getChineseIntroStart(contentChildren);
  //得到中文部分
  const englishIntroStart = getEnglishIntroStart(contentChildren);
  //得到英文部分
  const codeIndex = getCodeIndex(contentChildren);
  //找到第一个pre标签，同时该标签的为jsx属性
  const introEnd = codeIndex === -1 ? contentChildren.length : codeIndex;
  //我们包含英文和中文两部分content
  if (chineseIntroStart > -1 ) {
    markdownData.content = {
      'zh-CN': contentChildren.slice(chineseIntroStart + 1, englishIntroStart),
      'en-US': contentChildren.slice(englishIntroStart + 1, introEnd),
    };
  } else {
    markdownData.content = contentChildren.slice(0, introEnd);
  }
  const sourceCodeObject = getSourceCodeObject(contentChildren, codeIndex);
  //如果codeIndex，也就是含有属性为jsx的pre标签存在，那么我们此时就是ES6代码
  //否则就是TypeScript代码
  if (sourceCodeObject.isES6) {
    markdownData.highlightedCode = contentChildren[codeIndex].slice(0, 2);
    //得到pre标签以及pre标签含有的属性，其属性包含了jsx语言以及通过prism高亮显示后的结果
    markdownData.preview = utils.getPreview(sourceCodeObject.code);
    //这里添加了 'pre', { lang: '__react' }从而可以让dora-plugin-preview来处理~~~
  }
  //如路径为components/button/demo/basic.md，这是一个独立的markdown文件，通过第一个loader会转化为文件树，即
  //basic:require("components/button/demo/basic.md"),所以这里的markdownData对象就是指的是我们的basic对象
  const styleNode = getStyleNode(contentChildren);
  //得到两种节点：第一种是<pre language="css">，第二种是<style>标签。
  //(1)其中<style>标签的内容是对liveDemo进行样式调整的，会构建style标签插入到DOM中~~~~~~
  //(2)我们的<pre language="css">会直接显示在代码展示区块，http://1x.ant.design/components/card/
  //总之：如果第一个是<style>那么只获取到<style>中的css样式返回，并用于调节demo样式(https://raw.githubusercontent.com/ant-design/ant-design/master/components/button/demo/button-group.md)
  //否则如果第一个不是<style>，那么style中包含了<pre language="css">和<style>标签的内容，两者共同调节demo样式~~~
  if (isStyleTag(styleNode)) {
    markdownData.style = JsonML.getChildren(styleNode)[0];
  } else if (styleNode) {
    const styleTag = contentChildren.filter(isStyleTag)[0];
    markdownData.style = getCode(styleNode) + (styleTag ? JsonML.getChildren(styleTag)[0] : '');
    markdownData.highlightedStyle = JsonML.getAttributes(styleNode).highlighted;
  }
  if (meta.iframe) {
  //如果指定了是iframe，那么我们将我们的这个html模版进行渲染，替换掉变量后
  //然后放在输出文件夹下~~
  //Demo页面:https://ant.design/components/breadcrumb-cn/
    const html = nunjucks.renderString(tmpl, {
      id: meta.id,
      //meta.filename.replace(/\.md$/, '').replace(/\//g, '-');
      style: markdownData.style,
      //markdownData.style保存的内容与demo页面第一个是<style>还是<pre languate="css">有关~~
      script: babel.transform(getCode(markdownData.preview), babelrc).code,
      //对我们的<pre langage="jsx">的标签进行编译，编译成为ES5的代码
    });
    //此时内部的组件也会加载其自己的css，而且是通过require的
  // console.log("加载到的css为:",util.inspect(require('antd/lib/breadcrumb/style/css'),{showHidden:true,depth:3}));
    const fileName = `demo-${Math.random()}.html`;
    //生成一个iframe页面
    fs.writeFile(path.join(process.cwd(), 'site', fileName), html);
    //将iframe的内容写到输出目录下，同时将src方法markdownData对象上~~
    markdownData.src = path.join('/', fileName);
  }
  return markdownData;
};
