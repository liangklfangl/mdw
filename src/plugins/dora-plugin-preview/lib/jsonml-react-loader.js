'use strict';
const loaderUtils = require('loader-utils');
const generator = require('babel-generator').default;
const transformer = require('./transformer');
/**
 * [exports description]
 * @param  {[type]} content [jsonml from markdown-data-loader]
 * @return {[type]}         [description]
 */
module.exports = function jsonmlReactLoader(content) {
  if (this.cacheable) {
    this.cacheable();
  }
  const query = loaderUtils.getOptions(this);
  const lang = query.lang || 'react-example';
  //we get configured language in dora-plugin-preview
  const res = transformer(content, lang);
  //we input jsonml as content to tranformer function
  const inputAst = res.inputAst;
  const imports = res.imports;
  for (let k = 0; k < imports.length; k++) {
    inputAst.program.body.unshift(imports[k]);
  }

  const code = generator(inputAst, null, content).code;

  const noreact = query.noreact;
  if (noreact) {
    return code;
  }
  return 'import React from \'react\';\n' +
    'import ReactDOM from \'react-dom\';\n' +
    code;
};
