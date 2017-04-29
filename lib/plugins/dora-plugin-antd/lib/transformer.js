'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babel = require('babel-core');
var types = require('babel-types');
var traverse = require('babel-traverse').default;
var generator = require('babel-generator').default;

var errorBoxStyle = {
  padding: 10,
  background: 'rgb(204, 0, 0)',
  color: 'white',
  fontFamily: 'sans-serif',
  fontSize: '16px',
  fontWeight: 'bold',
  overflow: 'auto'
};

function requireGenerator(varName, moduleName) {
  return types.variableDeclaration('var', [types.variableDeclarator(types.identifier(varName), types.callExpression(types.identifier('require'), [types.stringLiteral(moduleName)]))]);
}

var defaultBabelConfig = {
  presets: ['es2015-ie', 'react', 'stage-0']
};

module.exports = function transformer(code) {
  var babelConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var noreact = arguments[2];

  var codeAst = null;
  try {
    var _babel$transform = babel.transform(code, (0, _assign2.default)({}, defaultBabelConfig, babelConfig)),
        ast = _babel$transform.ast;

    codeAst = ast;
    //转化为AST树
  } catch (e) {
    console.error(e);
    return 'function() { ' + '  var React = require(\'react\');' + '  return React.createElement(\'pre\', {' + ('    style: ' + (0, _stringify2.default)(errorBoxStyle)) + ('  }, \'' + e.toString() + '\'); ') + '}';
  }

  var renderReturn = null;
  traverse(codeAst, {
    CallExpression: function CallExpression(callPath) {
      var callPathNode = callPath.node;
      if (callPathNode.callee && callPathNode.callee.object && callPathNode.callee.object.name === 'ReactDOM' && callPathNode.callee.property && callPathNode.callee.property.name === 'render') {

        renderReturn = types.returnStatement(callPathNode.arguments[0]);

        callPath.remove();
      }
    }
  });

  var astProgramBody = codeAst.program.body;
  if (!noreact) {
    astProgramBody.unshift(requireGenerator('ReactDOM', 'react-dom'));
    astProgramBody.unshift(requireGenerator('React', 'react'));
  }
  // ReactDOM.render always at the last of preview method
  if (renderReturn) {
    astProgramBody.push(renderReturn);
  }

  var codeBlock = types.BlockStatement(astProgramBody);
  var previewFunction = types.functionDeclaration(types.Identifier('bishengPluginReactPreviewer'), [], codeBlock);
  return generator(types.program([previewFunction]), null, code).code;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(traverse, 'traverse', 'src/plugins/dora-plugin-antd/lib/transformer.js');

  __REACT_HOT_LOADER__.register(generator, 'generator', 'src/plugins/dora-plugin-antd/lib/transformer.js');

  __REACT_HOT_LOADER__.register(errorBoxStyle, 'errorBoxStyle', 'src/plugins/dora-plugin-antd/lib/transformer.js');

  __REACT_HOT_LOADER__.register(requireGenerator, 'requireGenerator', 'src/plugins/dora-plugin-antd/lib/transformer.js');

  __REACT_HOT_LOADER__.register(defaultBabelConfig, 'defaultBabelConfig', 'src/plugins/dora-plugin-antd/lib/transformer.js');
}();

;