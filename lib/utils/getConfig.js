'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var fs = require('fs');
var path = require('path');

var defaultConfig = {
  port: 8000,
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
  var config = _extends({}, defaultConfig, customizedConfig);
  config.plugins = [pluginHighlight].concat(config.plugins.map(function (plugin) {
    return isRelative(plugin) ? path.join(process.cwd(), plugin) : plugin;
  }));
  return config;
};