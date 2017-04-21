'use strict';

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
  preview.push([
    'code',
    sourceCode.replace(`${pkgName}/lib`, componentsPath),
  ]);
  //In code tag of pre with jsx attribute of demo page, we change lib/mdw to cwd/components
  //because our react components are all placed in components folder.
  return preview;
};
