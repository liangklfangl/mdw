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
  if (chineseIntroStart > -1 /* equal to englishIntroStart > -1 */) {
    markdownData.content = {
      'zh-CN': contentChildren.slice(chineseIntroStart + 1, englishIntroStart),
      'en-US': contentChildren.slice(englishIntroStart + 1, introEnd),
    };
  } else {
    markdownData.content = contentChildren.slice(0, introEnd);
  }
  const sourceCodeObject = getSourceCodeObject(contentChildren, codeIndex);
  //得到源代码
  if (sourceCodeObject.isES6) {
    markdownData.highlightedCode = contentChildren[codeIndex].slice(0, 2);
    //获取高亮的代码~~因为代码是<pre language="jsx">
     // markdownData.preview = utils.getPreview(sourceCodeObject.code);
    markdownData.preview = utils.getPreview(transformer(sourceCodeObject.code, babelrc));
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
    // console.log("内联进去的js代码:",util.inspect(transformer(sourceCodeObject.code, babelrc),{showHidden:true,depth:4}));
  if (meta.iframe) {
    meta.reactRouter ="react-router";
    const html = nunjucks.renderString(tmpl, {
      id: meta.id,
      style: markdownData.style,
      script: transformer(sourceCodeObject.code, babelrc),
      //meta中指定是否应该包含react-router~~
      reactRouter: meta.reactRouter === 'react-router' ? 'react-router@3/umd/ReactRouter' :
        (meta.reactRouter === 'react-router-dom' ? 'react-router-dom@4/umd/react-router-dom' : false),
    });
    const fileName = `demo-${Math.random()}.html`;
    fs.writeFile(path.join(process.cwd(), 'site', fileName), html);
    markdownData.src = path.join('/', fileName);
  }

  return markdownData;
};