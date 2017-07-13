'use strict';
const util = require('util');
const path = require('path');
const pkgPath = path.join(process.cwd(), 'package.json');
const pkgName = require(pkgPath).name;
//Name of our project
const componentsPath = path.join(process.cwd(), 'components');
//utils.getPreview(sourceCodeObject.code);,sourceCode is content of code tag
exports.getPreview = function getPreview(sourceCode) {
  const preview = [
    'pre', { lang: '__react' },
  ];
  //返回的这个pre标签的lang="__react"，同时我们的源代码里面的lib目录要替换
  preview.push([
    'code',
    sourceCode.replace(`${pkgName}/lib`, componentsPath),
  ]);

  // console.log(util.inspect(preview,{showHidden:true,depth:4}));
  return preview;
};
