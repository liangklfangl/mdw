const fs = require('fs');
const path = require('path');
const JsonML = require('jsonml.js/lib/utils');
const Prism = require('node-prismjs');
const nunjucks = require('nunjucks');
const babel = require('babel-core');
const utils = require("./utils");
const util = require("util");
nunjucks.configure({ autoescape: false });
const generator = require('babel-generator').default;
const transformer = require('./transformer');
const tmpl = fs.readFileSync(path.join(__dirname, 'template.html')).toString();
const jqueryTmpl = fs.readFileSync(path.join(__dirname, 'jquery-template.html')).toString();
//babel默认配置
const babelrc = {
  plugins: [
    require.resolve('babel-plugin-transform-runtime')//,
    // require.resolve("babel-plugin-add-module-exports"),
    // 因为我们是在一个markdown文件中写的，所以不需要这个插件
     // [ require.resolve('babel-plugin-import'), {
     //  libraryName: 'antd',
     //  style: 'css'
     // }]
    ]
};
function isStyleTag(node) {
  return node && JsonML.getTagName(node) === 'style';
}

function getCode(node) {
  return JsonML.getChildren(
    JsonML.getChildren(node)[0]
  )[0];
}

function getChineseIntroStart(contentChildren) {
  return contentChildren.findIndex(node =>
     JsonML.getTagName(node) === 'h2' &&
      JsonML.getChildren(node)[0] === 'zh-CN'
  );
}

function getEnglishIntroStart(contentChildren) {
  return contentChildren.findIndex(node =>
     JsonML.getTagName(node) === 'h2' &&
      JsonML.getChildren(node)[0] === 'en-US'
  );
}

function getCodeIndex(contentChildren) {
  return contentChildren.findIndex(node =>
     JsonML.getTagName(node) === 'pre' &&
      JsonML.getAttributes(node).lang === 'jsx'
  );
}

function getCorrespondingTSX(filename) {
  return path.join(process.cwd(), filename.replace(/\.md$/i, '.tsx'));
}

function getSourceCodeObject(contentChildren, codeIndex) {
  if (codeIndex > -1) {
    return {
      isES6: true,
      code: getCode(contentChildren[codeIndex]),
    };
  }
  return {
    isTS: true,
  };
}

function getStyleNode(contentChildren) {
  return contentChildren.filter(node =>
     isStyleTag(node) ||
      (JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'css')
  )[0];
}

/**
 * 得到需要展示给后端同学查看的代码
 * @param  {[type]} contentChildren [description]
 * @return {[type]}                 [description]
 */
function getDemoCodeForBack(contentChildren){
  return contentChildren.filter(node =>
      (JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === '__back')
  )[0];
}

/**
 * 得到preview展示的css代码
 * @param  {[type]} contentChildren [description]
 * @return {[type]}                 [description]
 */
function getCssCodeForBack(contentChildren){
  return contentChildren.filter(node =>
      (JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'css')
  )[0];
}

/**
 * 得到我们需要展示的纯jQuery插件，强烈依赖于jQuery
 * @param  {[type]} contentChildren [description]
 * @return {[type]}                 [description]
 */
function getJQueryCode(contentChildren){
  return contentChildren.filter(node =>
      (JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'js')
  )[0];
}

/**
 * 得到preview展示的html代码
 * @param  {[type]} contentChildren [description]
 * @return {[type]}                 [description]
 */
function getHtmlCodeForBack(contentChildren){
  return contentChildren.filter(node =>
      (JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'html')
  )[0];
}

module.exports = (markdownData, isBuild ) => {
  const meta = markdownData.meta;
  meta.id = meta.filename.replace(/\.md$/, '').replace(/\//g, '-');
  //将/转化为"-"
  if (isBuild && meta.debug) {
    return { meta: {} };
  }
  const contentChildren = JsonML.getChildren(markdownData.content);
  //得到markdown文件内容
  const chineseIntroStart = getChineseIntroStart(contentChildren);
  const englishIntroStart = getEnglishIntroStart(contentChildren);
  const codeIndex = getCodeIndex(contentChildren);
  //pre +jsx
  const introEnd = codeIndex === -1 ? contentChildren.length : codeIndex;
  //如果含有中文，那么获取中文部分的内容~~~
  if (chineseIntroStart > -1) {
    markdownData.content = {
      'zh-CN': ['section'].concat(contentChildren.slice(chineseIntroStart + 1, englishIntroStart)),
      'en-US': ['section'].concat(contentChildren.slice(englishIntroStart + 1, introEnd)),
    };
  } else {
    markdownData.content = contentChildren.slice(0, introEnd);
  }

  const sourceCodeObject = getSourceCodeObject(contentChildren, codeIndex);
  //得到源代码
  if (sourceCodeObject.isES6) {
    //后端显示的代码
    markdownData.highlightedCode = contentChildren[codeIndex].slice(0, 2);
    //获取高亮的代码~~因为代码是<pre language="jsx">
    markdownData.preview = utils.getPreview(sourceCodeObject.code);
    // console.log('ES6哪儿的代码===>',transformer(sourceCodeObject.code, babelrc));
    //这里采用了一种最新的技术来完成的
    // markdownData.preview = utils.getPreview(transformer(sourceCodeObject.code, babelrc));
  }
  // Add style node to markdown data.
  const styleNode = getStyleNode(contentChildren);
  if (isStyleTag(styleNode)) {
    markdownData.style = JsonML.getChildren(styleNode)[0];
  } else if (styleNode) {
    const styleTag = contentChildren.filter(isStyleTag)[0];
    markdownData.style = getCode(styleNode) + (styleTag ? JsonML.getChildren(styleTag)[0] : '');
    markdownData.highlightedStyle = JsonML.getAttributes(styleNode).highlighted;
  }

  //Demo页面中，用于显示服务端同学需要查看的html
  markdownData.demoHtmlForBack = getHtmlCodeForBack(contentChildren);
  markdownData.demoCssForBack = getCssCodeForBack(contentChildren);
  markdownData.jQueryCode = getJQueryCode(contentChildren);
  markdownData.demoCodeForBack = getDemoCodeForBack(contentChildren);

  //得到了我们的纯jQuery代码
  if(meta.iframe){
    const html = nunjucks.renderString(tmpl, {
      id: meta.id,
      style: markdownData.style,
      script: transformer(sourceCodeObject.code, babelrc),
      reactRouter: meta.reactRouter === 'react-router' ? 'react-router@3/umd/ReactRouter' :
        (meta.reactRouter === 'react-router-dom' ? 'react-router-dom@4/umd/react-router-dom' : false),
    });
    const fileName = `demo-${Math.random()}.html`;
    fs.writeFile(path.join(process.cwd(), 'site', fileName), html);
    //将我们的template页面渲染所有的js后写入到指定的目录中
    markdownData.src = path.join('/', fileName);
  }
  //表示是jQuery写的例子，我们依然采用iframe的方式来预览
  if (meta.jquery) {
    meta.reactRouter ="react-router";
    const html = nunjucks.renderString(jqueryTmpl, {
      id: meta.id,
      css:getCode(markdownData.demoCssForBack),
      script: getCode(markdownData.jQueryCode)
    });
    const jQueryFileName = `jquery-demo-${Math.random()}.html`;
    fs.writeFile(path.join(process.cwd(), 'site', jQueryFileName), html);
    //将我们的template页面渲染所有的js后写入到指定的目录中
    markdownData.src = path.join('/', jQueryFileName);
  }

  return markdownData;
};
