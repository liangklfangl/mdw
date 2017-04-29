'use strict';

var util = require('util');
var path = require('path');
var pkgPath = path.join(process.cwd(), 'package.json');
var pkgName = require(pkgPath).name;
//Name of our project
var componentsPath = path.join(process.cwd(), 'components');
//utils.getPreview(sourceCodeObject.code);,sourceCode is content of code tag
exports.getPreview = function getPreview(sourceCode) {
  var preview = ['pre', { lang: '__react' }];
  //返回的这个pre标签的lang="__react"，同时我们的源代码里面的lib目录要替换
  preview.push(['code', sourceCode.replace(pkgName + '/lib', componentsPath)]);
  // console.log(util.inspect(preview,{showHidden:true,depth:4}));
  return preview;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(pkgPath, 'pkgPath', 'src/plugins/dora-plugin-antd/lib/utils.js');

  __REACT_HOT_LOADER__.register(pkgName, 'pkgName', 'src/plugins/dora-plugin-antd/lib/utils.js');

  __REACT_HOT_LOADER__.register(componentsPath, 'componentsPath', 'src/plugins/dora-plugin-antd/lib/utils.js');
}();

;