'use strict';

var loaderUtils = require('loader-utils');
var generator = require('babel-generator').default;
var transformer = require('./transformer');
/**
 * [exports]
 * @param  {[type]} content [jsonml from markdown-data-loader]
 * @return {[type]}         []
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
  //We insert `import` before ast. But, if you want to update ast, you need to take care of ImportDeclaration and etc
  var code = generator(inputAst, null, content).code;
  //Turns an AST into code.
  var noreact = query.noreact;
  //You can pass noreact to refuse to import react
  if (noreact) {
    return code;
  }

  return 'const React =  require(\'react\');\n' + 'const ReactDOM = require(\'react-dom\');\n' + code;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(generator, 'generator', 'src/plugins/dora-plugin-preview/lib/jsonml-react-loader.js');
}();

;