'use strict';

var loaderUtils = require('loader-utils');
var generator = require('babel-generator').default;
var transformer = require('./transformer');
/**
 * [exports description]
 * @param  {[type]} content [jsonml from markdown-data-loader]
 * @return {[type]}         [description]
 */
module.exports = function jsonmlReactLoader(content) {
  if (this.cacheable) {
    this.cacheable();
  }
  var query = loaderUtils.getOptions(this);
  var lang = query.lang || 'react-example';
  //we get configured language in dora-plugin-preview
  var res = transformer(content, lang);
  //we input jsonml as content to tranformer function
  var inputAst = res.inputAst;
  var imports = res.imports;
  for (var k = 0; k < imports.length; k++) {
    inputAst.program.body.unshift(imports[k]);
  }

  var code = generator(inputAst, null, content).code;

  var noreact = query.noreact;
  if (noreact) {
    return code;
  }
  return 'import React from \'react\';\n' + 'import ReactDOM from \'react-dom\';\n' + code;
};