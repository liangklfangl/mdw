'use strict';

const Prism = require('node-prismjs');
const JsonML = require('jsonml.js/lib/utils');
function getCode(node) {
  return JsonML.getChildren(
    JsonML.getChildren(node)[0] || ''
  )[0] || '';
}
/**
 * 对代码进行高亮显示
 */
function highlight(node) {
  if (!JsonML.isElement(node)) return;
  if (JsonML.getTagName(node) !== 'pre') {
    JsonML.getChildren(node).forEach(highlight);
    return;
  }
  //我们只会处理pre标签
  const language = Prism.languages[JsonML.getAttributes(node).lang] ||
          Prism.languages.autoit;
  JsonML.getAttributes(node).highlighted =
    Prism.highlight(getCode(node), language);
}


module.exports = (markdownData/* , config*/) => {
  highlight(markdownData.content);
  return markdownData;
};
