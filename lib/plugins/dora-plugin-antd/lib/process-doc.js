'use strict';

var JsonML = require('jsonml.js/lib/utils');
/**
 * [description]
 * @param  {[type]} markdownData [Preprocessed jsonml from previous plugin]
 * @return {[type]}              [description]
 */
module.exports = function (markdownData) {
  var contentChildren = JsonML.getChildren(markdownData.content);
  var apiStartIndex = contentChildren.findIndex(function (node) {
    return JsonML.getTagName(node) === 'h2' && /^API/.test(JsonML.getChildren(node)[0]);
  });
  //get h2 tag with label of API. Previous is content and latter is API
  if (apiStartIndex > -1) {
    var content = contentChildren.slice(0, apiStartIndex);
    markdownData.content = ['section'].concat(content);
    var api = contentChildren.slice(apiStartIndex);
    markdownData.api = ['section'].concat(api);
  }
  return markdownData;
};