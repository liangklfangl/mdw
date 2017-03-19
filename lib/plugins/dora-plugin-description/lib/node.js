'use strict';

var JsonML = require('jsonml.js/lib/utils');
//'node' module will preprocess our markdown data tree in markdown-data-loader when require('x.md')
//  require(plugin[0])(markdownData, plugin[1], isBuild === true),second parameter is query part
module.exports = function (markdownData) {
  var content = markdownData.content;
  //After process of 'mark-twain', we get meta and content two parts
  var contentChildren = JsonML.getChildren(content);
  var dividerIndex = contentChildren.findIndex(function (node) {
    return JsonML.getTagName(node) === 'hr';
  });

  if (dividerIndex >= 0) {
    //If hr is finded, such as hr Element or ## this markdown attribute
    markdownData.description = ['section'].concat(contentChildren.slice(0, dividerIndex));
    //First part is description while second is content
    markdownData.content = [JsonML.getTagName(content), JsonML.getAttributes(content) || {}].concat(contentChildren.slice(dividerIndex + 1));
  }
  return markdownData;
};