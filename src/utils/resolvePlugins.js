'use strict';
const path = require('path');
const R = require('ramda');
const loaderUtils = require('loader-utils');
const resolve = require('resolve');
function resolvePlugin(plugin) {
  let result;
  try {
    result = resolve.sync(plugin, {
      basedir: process.cwd(),
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
  return plugins.map((plugin) => {
    const snippets = plugin.split('?');
    const pluginName = path.join(snippets[0], 'lib', moduleName).split(path.sep).join('/');
    let loaderContext ={};
    loaderContext.query = snippets[1] ? `?${snippets[1]}` : '';
    //getOptions is for loader, but we used for plugin here , so we construct a user defined object
    const pluginQuery = loaderUtils.getOptions(loaderContext);
    const resolvedPlugin = resolvePlugin(pluginName);
    //we get absolute file path by resolve.sync function 
    if (!resolvedPlugin) {
      return false;
    }
    return [
      resolvedPlugin,//Get absolute file path
      pluginQuery,//Query data object
    ];
  }).filter(R.identity);
};
