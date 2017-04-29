"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _getConfig = require("./getConfig");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _resolvePlugins = require("./resolvePlugins");

var _resolvePlugins2 = _interopRequireDefault(_resolvePlugins);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loaders = _path2.default.join(process.cwd(), "./lib/loaders");

var util = require('util');
/**
 * [exports Function for update webpack configuration, our configFile must provide an entry]
 * @param  {[type]}  webpackConfig [Default webpack config getting by wcf tool]
 * @para
 * m  {[type]}  configFile    [User defined mdw config file which update webpack config using 'webpack.updateConfig' hook]
 * @param  {Boolean} isBuild       [description]
 * @return {[type]}                [description]
 */
module.exports = function updateWebpackConfig(webpackConfig, configFile) {
  webpackConfig.entry = {};
  //In our mdw config file , we can not configure entry which must be relevant with react router!
  configFile = _path2.default.resolve(process.cwd(), configFile);
  if (!_fs2.default.existsSync(configFile)) {
    throw new Error('User defined file not exist!');
  }
  //Firstly: inject a loader to deal with md files which make use of 'webpack.updateConfig' hook
  webpackConfig.module.rules.push({
    test: /\.md$/,
    loaders: ['babel-loader', _path2.default.join(loaders, 'markdown-data-loader?config=' + configFile)]
  });
  //inject a loader for special file
  webpackConfig.module.rules.push({
    test: function test(filename) {
      return filename === _path2.default.join(__dirname, "..", 'utils', 'data.js') || filename === _path2.default.join(__dirname, "..", 'utils', 'ssr-data.js');
    },

    loader: "" + _path2.default.join(__dirname, "..", "loaders", 'dora-data-loader') + ("?config=" + configFile)
  });
  //Secondly:Using plugins `config` module to further update webpack config
  var config = (0, _getConfig2.default)(configFile);
  var pluginsConfig = (0, _resolvePlugins2.default)(config.plugins, 'config');
  //We get absolute path of plugin by path.join(process.cwd(), plugin)
  pluginsConfig.forEach(function (pluginConfig) {
    require(pluginConfig[0])(pluginConfig[1]).webpackConfig(webpackConfig, _webpack2.default);
  });
  //Thirdly: Invoking webpackConfig funtion in mdw config file to further update webpack config
  var finalUpdatedWebpackConfig = config.webpackConfig(webpackConfig, _webpack2.default);
  //Fourthly: Setting entry part of webpack config file
  var entryPath = _path2.default.join(_path2.default.join(__dirname, ".."), '..', 'tmp', 'entry.' + config.entryName + '.js');
  //entryName is also setted in our mdw config file
  // console.log("finalUpdatedWebpackConfig---->",util.inspect(finalUpdatedWebpackConfig,{showHidden:true,depth:3}));
  if (finalUpdatedWebpackConfig.entry[config.entryName]) {
    throw new Error('Should not set `webpackConfig.entry.' + config.entryName + '`!');
  }
  finalUpdatedWebpackConfig.entry[config.entryName] = entryPath;
  return finalUpdatedWebpackConfig;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(loaders, "loaders", "src/utils/updateWebpackConfig.js");
}();

;