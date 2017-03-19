'use strict';

var path = require('path');
var R = require('ramda');
var loaderUtils = require('loader-utils');
var resolve = require('resolve');
function resolvePlugin(plugin) {
  var result = void 0;
  try {
    result = resolve.sync(plugin, {
      basedir: process.cwd()
    }).split(path.sep).join('/');
  } catch (e) {}
  return result;
}

/**
 * [exports moduleName as "node/browser/etc", then we get this js file by moduleName]
 * @param  {[type]} plugins    [description]
 * @param  {[type]} moduleName [description]
 * @return {[type]}            [as right:[["lib/hello", "query0"], ["lib/hello", "query1"]]]
 */
module.exports = function resolvePlugins(plugins, moduleName) {
  return plugins.map(function (plugin) {
    var snippets = plugin.split('?');
    var pluginName = path.join(snippets[0], 'lib', moduleName).split(path.sep).join('/');
    var pluginQuery = loaderUtils.getOptions(snippets[1] ? '?' + snippets[1] : '');
    var resolvedPlugin = resolvePlugin(pluginName);
    //we get absolute file path by resolve.sync function 
    if (!resolvedPlugin) {
      return false;
    }
    return [resolvedPlugin, //Get absolute file path
    pluginQuery];
  }).filter(R.identity);
};