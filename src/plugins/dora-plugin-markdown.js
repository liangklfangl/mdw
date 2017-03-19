'use strict';
const updateWebpackConfig = require('../utils/updateWebpackConfig');
/**
 * [exports This is for dora-plugin-webpack to update webpack config, the hook is 'webpack.updateConfig' from dora-plugin-webpack]
 * @type {Object}
 * in order to  deal with markdown data, we must add a loader!
 */
module.exports = {
  'webpack.updateConfig'(webpackConfig) {
    return updateWebpackConfig(webpackConfig, this.query.config);
    //this.query.config is an file
  },
};
