'use strict';
const loaderUtils = require('loader-utils');
const generator = require('babel-generator').default;
const transformer = require('./transformer');
/**
 * [exports]
 * @param  {[type]} content [jsonml from markdown-data-loader]
 * @return {[type]}         []
 */
module.exports = function jsonmlReactLoader(content) {
// console.log('传入的content===========>',content);

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
  //We insert `import` before ast. But, if you want to update ast, you need to take care of ImportDeclaration and etc
  const code = generator(inputAst, null, content).code;
  //Turns an AST into code.
  const noreact = query.noreact;
  //You can pass noreact to refuse to import react
  if (noreact) {
    return code;
  }

 const returnCode = 'const React =  require(\'react\');\n' +
        'const ReactDOM = require(\'react-dom\');\n'+
        code;
  // console.log('jsonml-react-loader处理后的结果:',returnCode);
        return code;
};
