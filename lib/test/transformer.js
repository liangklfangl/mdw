'use strict';

var babylon = require('babylon');
var types = require('babel-types');
var traverse = require('babel-traverse').default;
function parser(content) {
  return babylon.parse(content, {
    sourceType: 'module',
    //sourceType: Indicate the mode the code should be parsed in.
    // Can be either "script" or "module".
    plugins: ['jsx', 'flow', 'asyncFunctions', 'classConstructorCall', 'doExpressions', 'trailingFunctionCommas', 'objectRestSpread', 'decorators', 'classProperties', 'exportExtensions', 'exponentiationOperator', 'asyncGenerators', 'functionBind', 'functionSent']
  });
}
/**
 * [exports description]
 * @param  {[type]} content [transformed jsonml of markdown file]
 * @param  {[type]} lang    [language we want to transform to]
 * @return {[type]}         [detail jsonml ,http://www.jsonml.org/]
 * We first remove ImportDeclaration and CallExpression, then we construct BlockStatement,returnStatement,functionExpression
 * In one word, we only care about pre tag which refer to code block in markdown file. That is why in browser.js
 * we care about node of function
 */
module.exports = function transformer(content, lang) {
  var imports = [];
  var inputAst = parser(content);
  //we transform our input to AST
  traverse(inputAst, {
    //Here, our path.node is an array
    ArrayExpression: function ArrayExpression(path) {
      var node = path.node;
      var firstItem = node.elements[0];
      //tagName
      var secondItem = node.elements[1];
      //attributes or child element
      var renderReturn = void 0;
      if (firstItem && firstItem.type === 'StringLiteral' && firstItem.value === 'pre' && secondItem.properties[0].value.value === lang) {
        //you can use this example to see:https://astexplorer.net/#/tSIO7NIclp/2%E8%A7%A3%E6%9E%90%E5%87%BA%E6%9D%A5%E7%9A%84%E5%B0%B1%E6%98%AF%E6%88%91%E4%BB%AC%E7%9A%84program.body%E9%83%A8%E5%88%86%EF%BC%8C%E4%B9%9F%E5%B0%B1%E6%98%AF%E5%A6%82%E4%B8%8B%E7%9A%84%E5%86%85%E5%AE%B9%EF%BC%9A
        /*
         ["pre",{"lang":"react"},
          ["code",["import css from ./index.js"]]
         ]
         because our pre element has attribute of highlighted, so secondItem is attribute node
         */
        var codeNode = node.elements[2].elements[1];
        //you can see this example in bin/test.js
        var code = codeNode.value;
        //we get code part
        var codeAst = parser(code);
        //we then parse code part of pre tag
        traverse(codeAst, {
          //see https://astexplorer.net/#/tSIO7NIclp/2%E8%A7%A3%E6%9E%90%E5%87%BA%E6%9D%A5%E7%9A%84%E5%B0%B1%E6%98%AF%E6%88%91%E4%BB%AC%E7%9A%84program.body%E9%83%A8%E5%88%86%EF%BC%8C%E4%B9%9F%E5%B0%B1%E6%98%AF%E5%A6%82%E4%B8%8B%E7%9A%84%E5%86%85%E5%AE%B9%EF%BC%9A
          //you can see $node in ImportDeclaration then we remove it
          ImportDeclaration: function ImportDeclaration(importPath) {
            imports.push(importPath.node);
            importPath.remove();
          },
          //ExpressionStatement->CallExpression->MemberExpression. Detail in https://astexplorer.net/#/tSIO7NIclp/2%E8%A7%A3%E6%9E%90%E5%87%BA%E6%9D%A5%E7%9A%84%E5%B0%B1%E6%98%AF%E6%88%91%E4%BB%AC%E7%9A%84program.body%E9%83%A8%E5%88%86%EF%BC%8C%E4%B9%9F%E5%B0%B1%E6%98%AF%E5%A6%82%E4%B8%8B%E7%9A%84%E5%86%85%E5%AE%B9%EF%BC%9A
          CallExpression: function CallExpression(CallPath) {
            var CallPathNode = CallPath.node;
            if (CallPathNode.callee && CallPathNode.callee.object && CallPathNode.callee.object.name === 'ReactDOM' && CallPathNode.callee.property && CallPathNode.callee.property.name === 'render') {
              //we focus on ReactDOM.render method
              renderReturn = types.returnStatement(CallPathNode.arguments[0]);
              //we focus on first parameter of ReactDOM.render method
              CallPath.remove();
            }
          }
        });
        //End of traverse of codeAst, `import` and `ReactDOM.render` are all removed, only 
        //a part of demo code remained!
        var astProgramBody = codeAst.program.body;
        //program.body are updated through previous manipulation
        var codeBlock = types.BlockStatement(astProgramBody);
        // ReactDOM.render always at the last of preview method
        if (renderReturn) {
          astProgramBody.push(renderReturn);
        }
        //program.body is an array, so we can push returnStatement to the end of array
        var coceFunction = types.functionExpression(types.Identifier('jsonmlReactLoader'),
        //here is an Identifier of function
        [], codeBlock
        //Even though `import` or 'ReactDOM.render' are removed, but
        // <program><codeBlock></codeBlock><returnStatement><returnStatement/></program>
        );
        path.replaceWith(coceFunction);
        //ArrayExpression are updated with coceFunction AST Object.
        //So, pre tagName will be replaced by a jsonmlReactLoader function
      }
    }
  });

  return {
    imports: imports,
    inputAst: inputAst
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(traverse, 'traverse', 'src/test/transformer.js');

  __REACT_HOT_LOADER__.register(parser, 'parser', 'src/test/transformer.js');
}();

;