'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _jsonmlToReactElement = require('jsonml-to-react-element');

var _jsonmlToReactElement2 = _interopRequireDefault(_jsonmlToReactElement);

var _utils = require('jsonml.js/lib/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isHeading(node) {
  return (/h[1-6]/i.test(_utils2.default.getTagName(node))
  );
}
/**
 * [generateSluggedId 为我们的H1-H6标签生产ID]
 * @param  {[type]} children [description]
 * @return {[type]}          [description]
 */
function generateSluggedId(children) {
  var headingText = children.map(function (node) {
    if (_utils2.default.isElement(node)) {
      if (_utils2.default.hasAttributes(node)) {
        return node[2] || '';
      }
      return node[1] || '';
    }
    return node;
  }).join('');
  //得到标题的内容,如[ 'article', [ 'h2', 'hello' ], [ 'h2', 'world' ] ]
  var sluggedId = headingText.trim().replace(/\s+/g, '-');
  //多个空格之间使用"_"来替换
  return sluggedId;
}
//如果函数返回一个对象，那么要用小括号括起来。所以这些jsonml都会传入到converter中
module.exports = function () {
  return {
    converters: [[function (node) {
      return _utils2.default.isElement(node) && isHeading(node);
    }, function (node, index) {
      var children = _utils2.default.getChildren(node);
      //得到h标签的内容，也就是我们的标题本身，如"API"
      var sluggedId = generateSluggedId(children);
      //生成ID
      return _react2.default.createElement(_utils2.default.getTagName(node), (0, _extends3.default)({
        key: index,
        id: sluggedId
      }, _utils2.default.getAttributes(node)), [_react2.default.createElement(
        'span',
        { key: 'title' },
        children.map(function (child) {
          return (0, _jsonmlToReactElement2.default)(child);
        })
      ), _react2.default.createElement(
        'a',
        { href: '#' + sluggedId, className: 'anchor', key: 'anchor' },
        '#'
      )]);
      //childElement
    }]]
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(isHeading, 'isHeading', 'src/plugins/dora-plugin-antd/lib/browser.js');

  __REACT_HOT_LOADER__.register(generateSluggedId, 'generateSluggedId', 'src/plugins/dora-plugin-antd/lib/browser.js');
}();

;