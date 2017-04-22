'use strict';

var Prism = require('node-prismjs');
//An adapter which make it easier to use Prism in Node.js.
var JsonML = require('jsonml.js/lib/utils');
function getCode(node) {
  return JsonML.getChildren(JsonML.getChildren(node)[0] || ''
  //Children of pre tagName is code, so we firstly get code Element by which we get true code!
  )[0] || '';
}
function highlight(node) {
  if (!JsonML.isElement(node)) return;
  //We just highlight those elements with tag of pre.
  if (JsonML.getTagName(node) !== 'pre') {
    JsonML.getChildren(node).forEach(highlight);
    return;
  }
  var language = Prism.languages[JsonML.getAttributes(node).lang] || Prism.languages.autoit;
  //Get attribute of language of pre Element
  JsonML.getAttributes(node).highlighted = Prism.highlight(getCode(node), language);
}

module.exports = function (markdownData /* , config*/) {
  highlight(markdownData.content);
  return markdownData;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getCode, 'getCode', 'src/plugins/dora-plugin-highlight/lib/node.js');

  __REACT_HOT_LOADER__.register(highlight, 'highlight', 'src/plugins/dora-plugin-highlight/lib/node.js');
}();

;