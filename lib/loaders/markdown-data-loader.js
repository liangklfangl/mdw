"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _resolvePlugins = require("../utils/resolvePlugins");

var _resolvePlugins2 = _interopRequireDefault(_resolvePlugins);

var _loaderUtils = require("loader-utils");

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _getConfig = require("../utils/getConfig");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _markdownData = require("../utils/markdownData");

var _markdownData2 = _interopRequireDefault(_markdownData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = require('util');

/**
 * [stringify markdown data]
 * @param  {[type]} node  [description]
 * @param  {Number} depth [description]
 * @return {[type]}       [description]
 * Sometimes , input as:
 * { content: [ 'article', [ 'h3', '1.md' ] ],
     meta: { filename: 'md\\index.md' }
   }
   Then we get follows:
  {
  "content": [
    "article",
    [
      "h3",
      "1.md"
    ]
  ],
  "meta": {
    "filename": "md\\index.md"
  }
}
 */
function stringify(node) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var indent = '  '.repeat(depth);
  if (Array.isArray(node)) {
    return "[\n" + node.map(function (item) {
      return indent + "  " + stringify(item, depth + 1);
    }).join(',\n') + ("\n" + indent + "]");
  }
  if ((typeof node === "undefined" ? "undefined" : (0, _typeof3.default)(node)) === 'object' && node !== null && !(node instanceof Date)) {
    // if (node.__BISHENG_EMBEDED_CODE) {
    //   return node.code;
    // }
    return "{\n" + (0, _keys2.default)(node).map(function (key) {
      var value = node[key];
      return indent + "  \"" + key + "\": " + stringify(value, depth + 1);
    }).join(',\n') + ("\n" + indent + "}");
  }
  return (0, _stringify2.default)(node, null, 2);
}

//source is content of markdown file
module.exports = function (source) {
  if (this.cacheable) {
    this.cacheable();
  }
  var webpackRemainingChain = _loaderUtils2.default.getRemainingRequest(this).split('!');
  //here we can get  'C:\\Users\\Administrator\\Desktop\\mdw\\readme.md?sex'
  var fullPath = webpackRemainingChain[webpackRemainingChain.length - 1];
  var filename = _path2.default.relative(process.cwd(), fullPath);
  // relative path
  var query = _loaderUtils2.default.getOptions(this);
  //get query config file of this loader, returned an object
  var plugins = (0, _getConfig2.default)(query.config).plugins;
  //combine user defined and default config
  var resolvedNodePlugins = (0, _resolvePlugins2.default)(plugins, "node");
  //we get "node" module of plugins
  // console.log('webpack真正加载md文件的时候plugins==========',util.inspect(resolvedNodePlugins,{showHidden:true,depth:1}));
  var parsedMarkdown = _markdownData2.default.process(filename, source, resolvedNodePlugins);
  // console.log("处理后的parsedMarkdown为",parsedMarkdown);
  //      console.log("---------------------------------------");
  //filename is absolute path of md file while source is content , resolvedNodePlugins is used to
  //further process markdown content. Meta part of markdown data include filename . We now get
  //mark-twain data. In detail http://www.jsonml.org/
  // console.log('webpack真正加载md文件的时候==========',util.inspect(parsedMarkdown,{showHidden:true,depth:3}));
  return "module.exports = " + stringify(parsedMarkdown);
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(stringify, "stringify", "src/loaders/markdown-data-loader.js");
}();

;