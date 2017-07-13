'use strict';
const JsonML = require('jsonml.js/lib/utils');
//'node' module will preprocess our markdown data tree in markdown-data-loader when require('x.md')
//  require(plugin[0])(markdownData, plugin[1], isBuild === true),second parameter is query part
module.exports = (markdownData) => {
  const content = markdownData.content;
  //After process of 'mark-twain', we get meta and content two parts
  const contentChildren = JsonML.getChildren(content);
  const dividerIndex = contentChildren.findIndex((node) => JsonML.getTagName(node) === 'hr');
  //对于content(除了meta的部分)中那些hr以前的部分叫做description，hr以后的部分叫做content
  if (dividerIndex >= 0) {
    //If hr is finded, such as hr Element or ## this markdown attribute
    markdownData.description = ['section']
      .concat(contentChildren.slice(0, dividerIndex));
     //First part is description while second is content
    markdownData.content = [
      JsonML.getTagName(content),
      JsonML.getAttributes(content) || {},
    ].concat(contentChildren.slice(dividerIndex + 1));
  }
  return markdownData;
};
