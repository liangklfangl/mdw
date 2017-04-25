'use strict';
const path = require('path');
function generateQuery(config) {
  return Object.keys(config)
    .map((key) => `${key}=${config[key]}`)
    .join('&');
}
//in updateWebpackCOnfig.js, we will do like this:
//require(pluginConfig[0])(pluginConfig[1]).webpackConfig(webpackConfig, webpack); in resolvePlugin function ,we will get this
//[
    //   resolvedPlugin,//Get absolute file path
    //   pluginQuery,//Query data object
    // ];
//In mdw.config.js, we will config like this: 'dora-plugin-toc?maxDepth=2&keepElem'
//Here, config is query parameter configured in mdw.config.js
module.exports = (config) => {
  return {
    webpackConfig(webpackConfig) {
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.test.toString() !== '/\\.md$/') return;
        const babelIndex = (rule.loaders||[]).indexOf('babel-loader');
        //In updateWebpackConfig, we use loaders array for markdown file
        const query = generateQuery(config);
        //We passed our query , lang=__react to jsonml-react-loader
        rule.loaders.splice(babelIndex + 1, 0, path.join(__dirname, `jsonml-react-loader?${query}`));
      });
      return webpackConfig;
    },
  };
};
