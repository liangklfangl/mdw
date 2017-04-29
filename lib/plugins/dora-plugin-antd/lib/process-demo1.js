'use strict';

var fs = require('fs');
var path = require('path');
var JsonML = require('jsonml.js/lib/utils');
var Prism = require('node-prismjs');
var nunjucks = require('nunjucks');
var babel = require('babel-core');
// const utils = require("./utils");
var util = require("util");
nunjucks.configure({ autoescape: false });
var generator = require('babel-generator').default;
var transformer = require('./transformer');
var tmpl = fs.readFileSync(path.join(__dirname, 'template.html')).toString();
//babel默认配置
var babelrc = {
  plugins: [require.resolve('babel-plugin-transform-runtime'),
  // require.resolve("babel-plugin-add-module-exports"),
  // 因为我们是在一个markdown文件中写的，所以不需要这个插件
  [require.resolve('babel-plugin-import'), {
    libraryName: 'antd',
    style: 'css'
  }]]
};
function isStyleTag(node) {
  return node && JsonML.getTagName(node) === 'style';
}

function getCode(node) {
  return JsonML.getChildren(JsonML.getChildren(node)[0])[0];
}

function getChineseIntroStart(contentChildren) {
  return contentChildren.findIndex(function (node) {
    return JsonML.getTagName(node) === 'h2' && JsonML.getChildren(node)[0] === 'zh-CN';
  });
}

function getEnglishIntroStart(contentChildren) {
  return contentChildren.findIndex(function (node) {
    return JsonML.getTagName(node) === 'h2' && JsonML.getChildren(node)[0] === 'en-US';
  });
}

function getCodeIndex(contentChildren) {
  return contentChildren.findIndex(function (node) {
    return JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'jsx';
  });
}

function getCorrespondingTSX(filename) {
  return path.join(process.cwd(), filename.replace(/\.md$/i, '.tsx'));
}

function getSourceCodeObject(contentChildren, codeIndex) {
  if (codeIndex > -1) {
    return {
      isES6: true,
      code: getCode(contentChildren[codeIndex])
    };
  }
  return {
    isTS: true
  };
}

function getStyleNode(contentChildren) {
  return contentChildren.filter(function (node) {
    return isStyleTag(node) || JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'css';
  })[0];
}

module.exports = function (markdownData, isBuild) {
  var meta = markdownData.meta;
  meta.id = meta.filename.replace(/\.md$/, '').replace(/\//g, '-');
  //将/转化为"-"
  if (isBuild && meta.debug) {
    return { meta: {} };
  }
  var contentChildren = JsonML.getChildren(markdownData.content);
  //得到markdown文件内容
  var chineseIntroStart = getChineseIntroStart(contentChildren);
  var englishIntroStart = getEnglishIntroStart(contentChildren);
  var codeIndex = getCodeIndex(contentChildren);
  //pre +jsx
  var introEnd = codeIndex === -1 ? contentChildren.length : codeIndex;
  //如果含有中文，那么获取中文部分的内容~~~
  if (chineseIntroStart > -1 /* equal to englishIntroStart > -1 */) {
      markdownData.content = {
        'zh-CN': contentChildren.slice(chineseIntroStart + 1, englishIntroStart),
        'en-US': contentChildren.slice(englishIntroStart + 1, introEnd)
      };
    } else {
    markdownData.content = contentChildren.slice(0, introEnd);
  }
  var sourceCodeObject = getSourceCodeObject(contentChildren, codeIndex);
  //得到源代码
  if (sourceCodeObject.isES6) {
    markdownData.highlightedCode = contentChildren[codeIndex].slice(0, 2);
    //获取高亮的代码~~因为代码是<pre language="jsx">
    // markdownData.preview = utils.getPreview(sourceCodeObject.code);
    markdownData.preview = transformer(sourceCodeObject.code, babelrc);
    console.log(util.inspect(markdownData, { showHidden: true, depth: 4 }));
  }
  // Add style node to markdown data.
  var styleNode = getStyleNode(contentChildren);
  if (isStyleTag(styleNode)) {
    markdownData.style = JsonML.getChildren(styleNode)[0];
  } else if (styleNode) {
    var styleTag = contentChildren.filter(isStyleTag)[0];
    markdownData.style = getCode(styleNode) + (styleTag ? JsonML.getChildren(styleTag)[0] : '');
    markdownData.highlightedStyle = JsonML.getAttributes(styleNode).highlighted;
  }

  if (meta.iframe) {
    var html = nunjucks.renderString(tmpl, {
      id: meta.id,
      style: markdownData.style,
      script: markdownData.preview.code,
      //meta中指定是否应该包含react-router~~
      reactRouter: meta.reactRouter === 'react-router' ? 'react-router@3/umd/ReactRouter' : meta.reactRouter === 'react-router-dom' ? 'react-router-dom@4/umd/react-router-dom' : false
    });
    var fileName = 'demo-' + Math.random() + '.html';
    fs.writeFile(path.join(process.cwd(), 'site', fileName), html);
    markdownData.src = path.join('/', fileName);
  }

  return markdownData;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(generator, 'generator', 'src/plugins/dora-plugin-antd/lib/process-demo1.js');

  __REACT_HOT_LOADER__.register(tmpl, 'tmpl', 'src/plugins/dora-plugin-antd/lib/process-demo1.js');

  __REACT_HOT_LOADER__.register(babelrc, 'babelrc', 'src/plugins/dora-plugin-antd/lib/process-demo1.js');

  __REACT_HOT_LOADER__.register(isStyleTag, 'isStyleTag', 'src/plugins/dora-plugin-antd/lib/process-demo1.js');

  __REACT_HOT_LOADER__.register(getCode, 'getCode', 'src/plugins/dora-plugin-antd/lib/process-demo1.js');

  __REACT_HOT_LOADER__.register(getChineseIntroStart, 'getChineseIntroStart', 'src/plugins/dora-plugin-antd/lib/process-demo1.js');

  __REACT_HOT_LOADER__.register(getEnglishIntroStart, 'getEnglishIntroStart', 'src/plugins/dora-plugin-antd/lib/process-demo1.js');

  __REACT_HOT_LOADER__.register(getCodeIndex, 'getCodeIndex', 'src/plugins/dora-plugin-antd/lib/process-demo1.js');

  __REACT_HOT_LOADER__.register(getCorrespondingTSX, 'getCorrespondingTSX', 'src/plugins/dora-plugin-antd/lib/process-demo1.js');

  __REACT_HOT_LOADER__.register(getSourceCodeObject, 'getSourceCodeObject', 'src/plugins/dora-plugin-antd/lib/process-demo1.js');

  __REACT_HOT_LOADER__.register(getStyleNode, 'getStyleNode', 'src/plugins/dora-plugin-antd/lib/process-demo1.js');
}();

;