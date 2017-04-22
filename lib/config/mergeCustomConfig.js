"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = deltConfig;

var _sourceManip = require("./sourceManip.js");

var _sourceManip2 = _interopRequireDefault(_sourceManip);

var _outputManip = require("./outputManip");

var _outputManip2 = _interopRequireDefault(_outputManip);

var _htmlManip = require("./htmlManip");

var _htmlManip2 = _interopRequireDefault(_htmlManip);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require("path");
var fs = require('fs');

var class2type = {};

var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function (name, i) {
  class2type["[object " + name + "]"] = name.toLowerCase();
});
var sourceFileTree = {};
/**
 * [mergeCustomConfig description]
 * @param  {[type]} defaultConfig [description]
 * @param  {[type]} customConfig  [description]
 * @return {[type]}               [description]
 */
function deltConfig(defaultConfig, customConfig) {
  if (type(customConfig) == "object") {
    _lodash2.default.extend(defaultConfig, customConfig);
  } else {
    //with no custom config file ,we skip it!
    if (customConfig) {
      var filePath = path.resolve(customConfig);
      if (!fs.existsSync(filePath)) {
        throw new Error("Custom config file not exist!");
      }
      _lodash2.default.extend(defaultConfig, require(filaPath));
    }
  }
  //we get the final config here, then we need to deal with.
  sourceFileTree = (0, _sourceManip2.default)(defaultConfig.source);
  //delt width source config to get a  fileTreeStructure
  (0, _outputManip2.default)(defaultConfig.output);
  //delt with output config to generate a folder
  (0, _htmlManip2.default)(defaultConfig.htmlTemplate, defaultConfig.output, defaultConfig.publicPath);

  return defaultConfig;
}

/**
 * [type description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function type(obj) {
  if (obj == null) {
    return obj + "";
  }
  return (typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(class2type, "class2type", "src/config/mergeCustomConfig.js");

  __REACT_HOT_LOADER__.register(toString, "toString", "src/config/mergeCustomConfig.js");

  __REACT_HOT_LOADER__.register(hasOwn, "hasOwn", "src/config/mergeCustomConfig.js");

  __REACT_HOT_LOADER__.register(sourceFileTree, "sourceFileTree", "src/config/mergeCustomConfig.js");

  __REACT_HOT_LOADER__.register(deltConfig, "deltConfig", "src/config/mergeCustomConfig.js");

  __REACT_HOT_LOADER__.register(type, "type", "src/config/mergeCustomConfig.js");
}();

;
module.exports = exports["default"];