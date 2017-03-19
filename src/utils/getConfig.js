'use strict';

const fs = require('fs');
const path = require('path');

const defaultConfig = {
  port: 8000,
  source: ['./components','./docs', 'changelog.md'],
  output: './site',
  theme: './theme',
  //theme and output path
  htmlTemplate: path.join(__dirname, '../template.html'),
  lazyLoad: false,
  plugins: [],
  doraConfig: {},
  webpackConfig(config) {
    return config;
  },
  entryName: 'index',
  //This is configuration part of our mdw project
  root: '/',
  filePathMapper(filePath) {
    return filePath;
  },
};
const pluginHighlight = path.join(__dirname, '..', 'plugins/dora-plugin-highlight').split(path.sep).join("/");
function isRelative(filepath) {
  return filepath.charAt(0) === '.';
}
/**
 * [exports : We combined our defaultConfig and custom defined config by object assign and plugins element is absolute folder path]
 * @param  {[type]} configFile [description]
 * @return {[type]}            [description]
 */
module.exports = function getConfig(configFile) {
 
  const customizedConfig = fs.existsSync(configFile) ? require(configFile) : {};
  const config = Object.assign({}, defaultConfig, customizedConfig);
  config.plugins = [pluginHighlight].concat(config.plugins.map(
    (plugin) => isRelative(plugin) ? path.join(process.cwd(), plugin) : plugin
  ));
  return config;
};
