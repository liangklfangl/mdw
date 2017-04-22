'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _mergeWebpackConfig = require('webpackcc/lib/mergeWebpackConfig');

var _mergeWebpackConfig2 = _interopRequireDefault(_mergeWebpackConfig);

var _getWebpackDefaultConfig = require('webpackcc/lib/getWebpackDefaultConfig');

var _getWebpackDefaultConfig2 = _interopRequireDefault(_getWebpackDefaultConfig);

var _webpackWatch = require('webpackcc/lib/webpackWatch');

var _webpackWatch2 = _interopRequireDefault(_webpackWatch);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _npmInstallWebpackPluginCn = require('npm-install-webpack-plugin-cn');

var _npmInstallWebpackPluginCn2 = _interopRequireDefault(_npmInstallWebpackPluginCn);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//getWebpackCommonConfig function will get default webpack configuration
var util = require('util');
//Second parameter of mergeCustomConfig function is an filePath which will export a function whose
//first paramter will receive webpackConfig! 

var webpackConfig = void 0;
var _default = {
  name: 'dora-plugin-webpack',

  'middleware.before': function middlewareBefore() {
    var applyPlugins = this.applyPlugins,
        query = this.query;
    //Get querys you configured in using it!

    var cwd = this.cwd;

    if (query.cwd) {
      cwd = query.cwd;
    }
    var customConfigPath = (0, _path.resolve)(cwd, query.config || 'webpack.config.js');
    //webpack.config.js in cwd can either export a function or object
    if ((0, _fs.existsSync)(customConfigPath)) {
      var customConfig = require(customConfigPath);
      // Support native webpack
      // If you provide a native webpack configuration, then we will not update config
      // unnative configuration is surrounded by function
      if ((typeof customConfig === 'undefined' ? 'undefined' : (0, _typeof3.default)(customConfig)) === 'object') {
        webpackConfig = customConfig;
        return;
      }
    }
    webpackConfig = (0, _getWebpackDefaultConfig2.default)((0, _extends3.default)({}, this, { cwd: cwd }), true);
    //If a function exported, we will use getWebpackCommonConfig and mergeCustomConfig to update
    //webpack config
    webpackConfig.devtool = '#cheap-module-source-map';
    if (!query.disableNpmInstall) {
      webpackConfig.plugins.push(new _npmInstallWebpackPluginCn2.default({
        save: true
      }));
    }
    webpackConfig = applyPlugins('webpack.updateConfig', webpackConfig);
    webpackConfig = (0, _mergeWebpackConfig2.default)(webpackConfig, customConfigPath);
    webpackConfig = applyPlugins('webpack.updateConfig.finally', webpackConfig);

    if (query.publicPath) {
      webpackConfig.output.publicPath = query.publicPath;
    }
    if (!query.publicPath && webpackConfig.output.publicPath) {
      query.publicPath = webpackConfig.output.publicPath;
    }
  },
  'middleware': function middleware() {
    var _query = this.query,
        verbose = _query.verbose,
        physcisFileSystem = _query.physcisFileSystem;
    // const compiler = webpack(webpackConfig);

    var compiler = (0, _webpackWatch2.default)(webpackConfig, { watch: true });
    this.set('compiler', compiler);

    compiler.plugin('done', function doneHandler(stats) {
      if (verbose || stats.hasErrors()) {
        console.log(stats.toString({ colors: true }));
      }
    });
    if (physcisFileSystem) {
      var outputFileSystem = compiler.outputFileSystem;
      setTimeout(function () {
        compiler.outputFileSystem = outputFileSystem;
      }, 0);
    }
    return require('koa-webpack-dev-middleware')(compiler, (0, _extends3.default)({
      publicPath: '/',
      quiet: true
    }, this.query));
  },
  'server.after': function serverAfter() {
    var _this = this;

    var query = this.query;
    var cwd = this.cwd;

    if (query.cwd) {
      cwd = query.cwd;
    }
    var pkgPath = (0, _path.join)(cwd, 'package.json');

    function getEntry() {
      try {
        return JSON.parse((0, _fs.readFileSync)(pkgPath, 'utf-8')).entry;
      } catch (e) {
        return null;
      }
    }

    var entry = getEntry();
    _chokidar2.default.watch(pkgPath).on('change', function () {
      if (!(0, _lodash2.default)(getEntry(), entry)) {
        _this.restart();
      }
    });

    var webpackConfigPath = (0, _path.resolve)(cwd, query.config || 'webpack.config.js');
    _chokidar2.default.watch(webpackConfigPath).on('change', function () {
      _this.restart();
    });
  }
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(webpackConfig, 'webpackConfig', 'src/plugins/dora-plugin-webpack.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/plugins/dora-plugin-webpack.js');
}();

;
module.exports = exports['default'];