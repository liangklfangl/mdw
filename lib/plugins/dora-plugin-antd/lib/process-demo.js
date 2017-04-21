'use strict';

var fs = require('fs');
var path = require('path');
var JsonML = require('jsonml.js/lib/utils');
var Prism = require('node-prismjs');
var nunjucks = require('nunjucks');
nunjucks.configure({ autoescape: false });

var babel = require('babel-core');
var babelrc = {
  presets: ['es2015', 'react'].map(function (m) {
    return require.resolve('babel-preset-' + m);
  })
};
//babelrc file
var tmpl = fs.readFileSync(path.join(__dirname, 'template.html')).toString();
var utils = require('./utils');

function isStyleTag(node) {
  return node && JsonML.getTagName(node) === 'style';
}

/**
 * [getCode We get content of code tag]
 * @param  {[type]} node [description]
 * @return {[type]}      [description]
 */
function getCode(node) {
  return JsonML.getChildren(JsonML.getChildren(node)[0])[0];
}

/**
 * [getChineseIntroStart description]
 * @param  {[type]} contentChildren [content part of markdownData, meta part eliminated]
 * @return {[type]}                 [return Index of h2 tag with 'zh-CN' as label of children]
 */
function getChineseIntroStart(contentChildren) {
  return contentChildren.findIndex(function (node) {
    return JsonML.getTagName(node) === 'h2' && JsonML.getChildren(node)[0] === 'zh-CN';
  });
}

/**
 * [getEnglishIntroStart Get h2 with label of 'en-US']
 * @param  {[type]} contentChildren [description]
 * @return {[type]}                 [description]
 */
function getEnglishIntroStart(contentChildren) {
  return contentChildren.findIndex(function (node) {
    return JsonML.getTagName(node) === 'h2' && JsonML.getChildren(node)[0] === 'en-US';
  });
}

/**
 * [getCodeIndex We will get jsx part, because English and Chinese version commonly use one code part]
 * @param  {[type]} contentChildren [description]
 * @return {[type]}                 [description]
 */
function getCodeIndex(contentChildren) {
  return contentChildren.findIndex(function (node) {
    return JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'jsx';
  });
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
      code: getCode(contentChildren[codeIndex])
    };
  }
  return {
    isTS: true
  };
}

/**
 * [getStyleNode we care about style tag or pre with css attribute]
 * @param  {[type]} contentChildren [description]
 * @return {[type]}                 [description]
 */
function getStyleNode(contentChildren) {
  return contentChildren.filter(function (node) {
    return isStyleTag(node) || JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'css';
  })[0];
}

/**
 * [description]
 * @param  {[type]}  markdownData [Preprocessed jsonml of previous plugin]
 * @param  {Boolean} isBuild      [description]
 * @return {[type]}               [description]
 */
module.exports = function (markdownData, isBuild) {
  var meta = markdownData.meta;
  meta.id = meta.filename.replace(/\.md$/, '').replace(/\//g, '-');
  // Should throw debugging demo while publish.
  if (isBuild && meta.debug) {
    return { meta: {} };
  }
  // Update content of demo.
  var contentChildren = JsonML.getChildren(markdownData.content);
  //We get content part , meta part eliminated
  var chineseIntroStart = getChineseIntroStart(contentChildren);
  //We invoke findIndex to get index of h2 tag with label of 'zh-CN'
  var englishIntroStart = getEnglishIntroStart(contentChildren);
  //We invoke findIndex to get index of h2 tag with label of 'en-US'
  var codeIndex = getCodeIndex(contentChildren);
  //get Pre tag with jsx as attribute
  var introEnd = codeIndex === -1 ? contentChildren.length : codeIndex;
  //in Demo page, we will devide content into two parts, zh-CN and en-US. Get end of introduction
  if (chineseIntroStart > -1) {
    markdownData.content = {
      'zh-CN': contentChildren.slice(chineseIntroStart + 1, englishIntroStart),
      'en-US': contentChildren.slice(englishIntroStart + 1, introEnd)
    };
  } else {
    markdownData.content = contentChildren.slice(0, introEnd);
  }
  var sourceCodeObject = getSourceCodeObject(contentChildren, codeIndex);
  //we get content of code tag
  if (sourceCodeObject.isES6) {
    //if we are in jsx syntax
    markdownData.highlightedCode = contentChildren[codeIndex].slice(0, 2);
    //codeIndex is pre tag with jsx attribute, so here we will get pre attribute and code tag
    markdownData.preview = utils.getPreview(sourceCodeObject.code);
    //change lib components reference to components folder
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
  //markdownData.style and  markdownData.highlightedStyle are injected
  if (meta.iframe) {
    var html = nunjucks.renderString(tmpl, {
      id: meta.id, //meta.filename.replace(/\.md$/, '').replace(/\//g, '-');
      style: markdownData.style, //css content
      script: babel.transform(getCode(markdownData.preview), babelrc).code
    });
    var fileName = 'demo-' + Math.random() + '.html';
    fs.writeFile(path.join(process.cwd(), '_site', fileName), html);
    markdownData.src = path.join('/', fileName);
    //src
  }
  return markdownData;
};