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
    var loaderContext = {};
    loaderContext.query = snippets[1] ? '?' + snippets[1] : '';
    //getOptions is for loader, but we used for plugin here , so we construct a user defined object
    var pluginQuery = loaderUtils.getOptions(loaderContext);
    var resolvedPlugin = resolvePlugin(pluginName);
    //we get absolute file path by resolve.sync function 
    if (!resolvedPlugin) {
      return false;
    }
    return [resolvedPlugin, //Get absolute file path
    pluginQuery];
  } //Query data object
  ).filter(R.identity);
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(resolvePlugin, 'resolvePlugin', 'src/utils/resolvePlugins.js');
}();

;