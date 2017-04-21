'use strict';

var path = require('path');
var pkgPath = path.join(process.cwd(), 'package.json');
var pkgName = require(pkgPath).name;
//Name of our project
var componentsPath = path.join(process.cwd(), 'components');
//utils.getPreview(sourceCodeObject.code);,sourceCode is content of code tag
exports.getPreview = function getPreview(sourceCode) {
  var preview = ['pre', { lang: '__react' }];
  preview.push(['code', sourceCode.replace(pkgName + '/lib', componentsPath)]);
  //In code tag of pre with jsx attribute of demo page, we change lib/mdw to cwd/components
  //because our react components are all placed in components folder.
  return preview;
};