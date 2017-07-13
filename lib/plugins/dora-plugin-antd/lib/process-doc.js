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
  //(1)我们的content部分是api之前的部分，而api之后的部分就是api
  if (apiStartIndex > -1) {
    var content = contentChildren.slice(0, apiStartIndex);
    markdownData.content = ['section'].concat(content);
    var api = contentChildren.slice(apiStartIndex);
    // const commonProblem = contentChildren.slice(apiStartIndex+1);
    markdownData.api = ['section'].concat(api);
    // markdownData.commonProblem = ['section'].concat(commonProblem);
  }

  // console.log('prerequisiteIndex------',prerequisiteIndex);
  //表示有前提条件部分，前提部分是[prerequisiteIndex,apiStartIndex]
  // if(prerequisiteIndex>-1){
  //    const prerequisite = contentChildren.slice(prerequisiteIndex,apiStartIndex);
  //    markdownData.prerequisite = ["section"].concat(prerequisite);
  // }
  //(2)对于api之前的部分会继续处理，同时对于API后面的部分还需要添加FeedBack内容，用于记录常见的问题

  return markdownData;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;