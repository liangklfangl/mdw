'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
function generateQuery(config) {
  return (0, _keys2.default)(config).map(function (key) {
    return key + '=' + config[key];
  }).join('&');
}
//in updateWebpackCOnfig.js, we will do like this:
//require(pluginConfig[0])(pluginConfig[1]).webpackConfig(webpackConfig, webpack); in resolvePlugin function ,we will get this
//[
//   resolvedPlugin,//Get absolute file path
//   pluginQuery,//Query data object
// ];
//In mdw.config.js, we will config like this: 'dora-plugin-toc?maxDepth=2&keepElem'
//Here, config is query parameter configured in mdw.config.js
module.exports = function (config) {
  return {
    webpackConfig: function webpackConfig(_webpackConfig) {
      _webpackConfig.module.rules.forEach(function (rule) {
        if (rule.test.toString() !== '/\\.md$/') return;
        var babelIndex = (rule.loaders || []).indexOf('babel-loader');
        //In updateWebpackConfig, we use loaders array for markdown file
        var query = generateQuery(config);
        //We passed our query , lang=__react to jsonml-react-loader
        rule.loaders.splice(babelIndex + 1, 0, path.join(__dirname, 'jsonml-react-loader?' + query));
      });
      return _webpackConfig;
    }
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(generateQuery, 'generateQuery', 'src/plugins/dora-plugin-preview/lib/config.js');
}();

;