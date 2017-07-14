'use strict';

var fs = require('fs');
var path = require('path');
var JsonML = require('jsonml.js/lib/utils');
var Prism = require('node-prismjs');
var nunjucks = require('nunjucks');
var babel = require('babel-core');
var utils = require("./utils");
var util = require("util");
nunjucks.configure({ autoescape: false });
var generator = require('babel-generator').default;
var transformer = require('./transformer');
var tmpl = fs.readFileSync(path.join(__dirname, 'template.html')).toString();
var jqueryTmpl = fs.readFileSync(path.join(__dirname, 'jquery-template.html')).toString();
//babel默认配置
var babelrc = {
  plugins: [require.resolve('babel-plugin-transform-runtime') //,
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

/**
 * 得到需要展示给后端同学查看的代码
 * @param  {[type]} contentChildren [description]
 * @return {[type]}                 [description]
 */
function getDemoCodeForBack(contentChildren) {
  return contentChildren.filter(function (node) {
    return JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === '__back';
  })[0];
}

/**
 * 得到preview展示的css代码
 * @param  {[type]} contentChildren [description]
 * @return {[type]}                 [description]
 */
function getCssCodeForBack(contentChildren) {
  return contentChildren.filter(function (node) {
    return JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'css';
  })[0];
}

/**
 * 得到我们需要展示的纯jQuery插件，强烈依赖于jQuery
 * @param  {[type]} contentChildren [description]
 * @return {[type]}                 [description]
 */
function getJQueryCode(contentChildren) {
  return contentChildren.filter(function (node) {
    return JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'js';
  })[0];
}

/**
 * 得到preview展示的html代码
 * @param  {[type]} contentChildren [description]
 * @return {[type]}                 [description]
 */
function getHtmlCodeForBack(contentChildren) {
  return contentChildren.filter(function (node) {
    return JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'html';
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
  if (chineseIntroStart > -1) {
    markdownData.content = {
      'zh-CN': ['section'].concat(contentChildren.slice(chineseIntroStart + 1, englishIntroStart)),
      'en-US': ['section'].concat(contentChildren.slice(englishIntroStart + 1, introEnd))
    };
  } else {
    markdownData.content = contentChildren.slice(0, introEnd);
  }

  var sourceCodeObject = getSourceCodeObject(contentChildren, codeIndex);
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
  var styleNode = getStyleNode(contentChildren);
  if (isStyleTag(styleNode)) {
    markdownData.style = JsonML.getChildren(styleNode)[0];
  } else if (styleNode) {
    var styleTag = contentChildren.filter(isStyleTag)[0];
    markdownData.style = getCode(styleNode) + (styleTag ? JsonML.getChildren(styleTag)[0] : '');
    markdownData.highlightedStyle = JsonML.getAttributes(styleNode).highlighted;
  }

  //Demo页面中，用于显示服务端同学需要查看的html
  markdownData.demoHtmlForBack = getHtmlCodeForBack(contentChildren);
  markdownData.demoCssForBack = getCssCodeForBack(contentChildren);
  markdownData.jQueryCode = getJQueryCode(contentChildren);
  markdownData.demoCodeForBack = getDemoCodeForBack(contentChildren);

  //得到了我们的纯jQuery代码
  if (meta.iframe) {
    var html = nunjucks.renderString(tmpl, {
      id: meta.id,
      style: markdownData.style,
      script: transformer(sourceCodeObject.code, babelrc),
      reactRouter: meta.reactRouter === 'react-router' ? 'react-router@3/umd/ReactRouter' : meta.reactRouter === 'react-router-dom' ? 'react-router-dom@4/umd/react-router-dom' : false
    });
    var fileName = 'demo-' + Math.random() + '.html';
    fs.writeFile(path.join(process.cwd(), 'site', fileName), html);
    //将我们的template页面渲染所有的js后写入到指定的目录中
    markdownData.src = path.join('/', fileName);
  }
  //表示是jQuery写的例子，我们依然采用iframe的方式来预览
  if (meta.jquery) {
    meta.reactRouter = "react-router";
    var _html = nunjucks.renderString(jqueryTmpl, {
      id: meta.id,
      css: getCode(markdownData.demoCssForBack),
      script: getCode(markdownData.jQueryCode)
    });
    var jQueryFileName = 'jquery-demo-' + Math.random() + '.html';
    fs.writeFile(path.join(process.cwd(), 'site', jQueryFileName), _html);
    //将我们的template页面渲染所有的js后写入到指定的目录中
    markdownData.src = path.join('/', jQueryFileName);
  }

  return markdownData;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(generator, 'generator', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(tmpl, 'tmpl', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(jqueryTmpl, 'jqueryTmpl', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(babelrc, 'babelrc', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(isStyleTag, 'isStyleTag', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(getCode, 'getCode', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(getChineseIntroStart, 'getChineseIntroStart', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(getEnglishIntroStart, 'getEnglishIntroStart', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(getCodeIndex, 'getCodeIndex', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(getCorrespondingTSX, 'getCorrespondingTSX', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(getSourceCodeObject, 'getSourceCodeObject', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(getStyleNode, 'getStyleNode', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(getDemoCodeForBack, 'getDemoCodeForBack', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(getCssCodeForBack, 'getCssCodeForBack', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(getJQueryCode, 'getJQueryCode', 'src/plugins/dora-plugin-antd/lib/process-demo.js');

  __REACT_HOT_LOADER__.register(getHtmlCodeForBack, 'getHtmlCodeForBack', 'src/plugins/dora-plugin-antd/lib/process-demo.js');
}();

;