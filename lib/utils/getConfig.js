'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');

var defaultConfig = {
  port: 8888,
  source: ['./components', './docs', 'changelog.md'],
  output: './site',
  theme: './theme',
  //theme and output path
  htmlTemplate: path.join(__dirname, '../template.html'),
  lazyLoad: false,
  plugins: [],
  doraConfig: {},
  webpackConfig: function webpackConfig(config) {
    return config;
  },

  entryName: 'index',
  //This is configuration part of our mdw project
  root: '/',
  filePathMapper: function filePathMapper(filePath) {
    return filePath;
  }
};
var pluginHighlight = path.join(__dirname, '..', 'plugins/dora-plugin-highlight').split(path.sep).join("/");
function isRelative(filepath) {
  return filepath.charAt(0) === '.';
}
/**
 * [exports : We combined our defaultConfig and custom defined config by object assign and plugins element is absolute folder path]
 * @param  {[type]} configFile [description]
 * @return {[type]}            [description]
 */
module.exports = function getConfig(configFile) {

  var customizedConfig = fs.existsSync(configFile) ? require(configFile) : {};
  var config = (0, _assign2.default)({}, defaultConfig, customizedConfig);
  config.plugins = [pluginHighlight].concat(config.plugins.map(function (plugin) {
    return isRelative(plugin) ? path.join(process.cwd(), plugin) : plugin;
  }));
  return config;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(defaultConfig, 'defaultConfig', 'src/utils/getConfig.js');

  __REACT_HOT_LOADER__.register(pluginHighlight, 'pluginHighlight', 'src/utils/getConfig.js');

  __REACT_HOT_LOADER__.register(isRelative, 'isRelative', 'src/utils/getConfig.js');
}();

;