'use strict';

var babylon = require('babylon');
var types = require('babel-types');
var traverse = require('babel-traverse').default;
function parser(content) {
  return babylon.parse(content, {
    sourceType: 'module',
    plugins: ['jsx', 'flow', 'asyncFunctions', 'classConstructorCall', 'doExpressions', 'trailingFunctionCommas', 'objectRestSpread', 'decorators', 'classProperties', 'exportExtensions', 'exponentiationOperator', 'asyncGenerators', 'functionBind', 'functionSent']
  });
}
/**
 * [exports description]
 * @param  {[type]} content [transformed jsonml of markdown file]
 * @param  {[type]} lang    [language we want to transform to]
 * @return {[type]}         [description]
 */
module.exports = function transformer(content, lang) {
  var imports = [];
  var inputAst = parser(content);
  traverse(inputAst, {
    ArrayExpression: function ArrayExpression(path) {
      var node = path.node;
      var firstItem = node.elements[0];
      var secondItem = node.elements[1];
      var renderReturn = void 0;
      if (firstItem && firstItem.type === 'StringLiteral' && firstItem.value === 'pre' && secondItem.properties[0].value.value === lang) {
        var codeNode = node.elements[2].elements[1];
        var code = codeNode.value;

        var codeAst = parser(code);

        traverse(codeAst, {
          ImportDeclaration: function ImportDeclaration(importPath) {
            imports.push(importPath.node);
            importPath.remove();
          },
          CallExpression: function CallExpression(CallPath) {
            var CallPathNode = CallPath.node;
            if (CallPathNode.callee && CallPathNode.callee.object && CallPathNode.callee.object.name === 'ReactDOM' && CallPathNode.callee.property && CallPathNode.callee.property.name === 'render') {

              renderReturn = types.returnStatement(CallPathNode.arguments[0]);

              CallPath.remove();
            }
          }
        });

        var astProgramBody = codeAst.program.body;
        var codeBlock = types.BlockStatement(astProgramBody);

        // ReactDOM.render always at the last of preview method
        if (renderReturn) {
          astProgramBody.push(renderReturn);
        }

        var coceFunction = types.functionExpression(types.Identifier('jsonmlReactLoader'), [], codeBlock);
        path.replaceWith(coceFunction);
      }
    }
  });

  return {
    imports: imports,
    inputAst: inputAst
  };
};