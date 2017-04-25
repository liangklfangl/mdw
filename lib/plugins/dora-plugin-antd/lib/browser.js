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

function isZhCN(pathname) {
  return (/-cn\/?$/.test(pathname)
  );
}

function makeSureComonentsLink(pathname) {
  var pathSnippets = pathname.split('#');
  if (pathSnippets[0].indexOf('/components') > -1 && !pathSnippets[0].endsWith('/')) {
    pathSnippets[0] = pathSnippets[0] + '/';
  }
  return pathSnippets.join('#');
}

function toZhCNPathname(pathname) {
  var pathSnippets = pathname.split('#');
  pathSnippets[0] = pathSnippets[0].replace(/\/$/, '') + '-cn';
  return makeSureComonentsLink(pathSnippets.join('#'));
}

/**
 * [generateSluggedId Generate id]
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
  var sluggedId = headingText.trim().replace(/\s+/g, '-');
  //"When to use" will be changed to "When-to-use"
  return sluggedId;
}

// export default doesn't work
module.exports = function (_, props) {
  return {
    converters: [[function (node) {
      return _utils2.default.isElement(node) && isHeading(node);
    }, function (node, index) {
      var children = _utils2.default.getChildren(node);
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
    }], [function (node) {
      return _utils2.default.isElement(node) && _utils2.default.getTagName(node) === 'a' && !(
      //如果是a标签，我们转化为link
      _utils2.default.getAttributes(node).class || _utils2.default.getAttributes(node).href && _utils2.default.getAttributes(node).href.indexOf('http') === 0 || /^#/.test(_utils2.default.getAttributes(node).href));
    }, function (node, index) {
      var href = _utils2.default.getAttributes(node).href;
      return _react2.default.createElement(
        _reactRouter.Link,
        {
          to: isZhCN(props.location.pathname) ? toZhCNPathname(href) : makeSureComonentsLink(href),
          key: index
        },
        (0, _jsonmlToReactElement2.default)(_utils2.default.getChildren(node)[0])
      );
    }]]
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(isHeading, 'isHeading', 'src/plugins/dora-plugin-antd/lib/browser.js');

  __REACT_HOT_LOADER__.register(isZhCN, 'isZhCN', 'src/plugins/dora-plugin-antd/lib/browser.js');

  __REACT_HOT_LOADER__.register(makeSureComonentsLink, 'makeSureComonentsLink', 'src/plugins/dora-plugin-antd/lib/browser.js');

  __REACT_HOT_LOADER__.register(toZhCNPathname, 'toZhCNPathname', 'src/plugins/dora-plugin-antd/lib/browser.js');

  __REACT_HOT_LOADER__.register(generateSluggedId, 'generateSluggedId', 'src/plugins/dora-plugin-antd/lib/browser.js');
}();

;