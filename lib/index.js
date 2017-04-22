"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

exports.default = build;

var _dora = require("dora");

var _dora2 = _interopRequireDefault(_dora);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require("mkdirp");

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _getConfig = require("./utils/getConfig");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _nunjucks = require("nunjucks");

var _nunjucks2 = _interopRequireDefault(_nunjucks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultConfig = require("./config/defaultConfig.js");
//get default configuration
var deltConfig = require("./config/mergeCustomConfig.js");
var _ = require('lodash');

/**
 * [getRoutesPath](Our routes.js have to know where our components lay, so it must receive themePath)
 * @param  {[type]} themePath [Where to put theme file , just as react component]
 * @return {[type]}           [description]
 */
function getRoutesPath(themePath) {
  var routesPath = _path2.default.join(__dirname, '..', 'tmp', 'routes.js');
  _fs2.default.writeFileSync(routesPath, _nunjucks2.default.renderString(_fs2.default.readFileSync(_path2.default.join(__dirname, 'routes.nunjucks.js')).toString(), { themePath: themePath }));
  return routesPath;
}
/**
 * [generateEntryFile Entry file has to know where our routes.js lays. In one word ,entry konw routes and routes know theme]
 * @param  {[type]} configTheme     [theme: './site/theme',]
 * @param  {[type]} configEntryName [description]
 * @param  {[type]} root            [description]
 * @return {[type]}                 [description]
 */
function generateEntryFile(configTheme, configEntryName, root) {
  var entryPath = _path2.default.join(__dirname, '..', 'tmp', 'entry.' + configEntryName + '.js');
  var routesPath = getRoutesPath(_path2.default.join(process.cwd(), configTheme).split(_path2.default.sep).join("/")).split(_path2.default.sep).join("/");
  _fs2.default.writeFileSync(entryPath, _nunjucks2.default.renderString(_fs2.default.readFileSync(_path2.default.join(__dirname, 'entry.nunjucks.js')).toString(), { routesPath: routesPath, root: root }));
}

function build(program) {
  //Step 1:Generate main html file by mdw config file
  var combinedMdwConfig = (0, _getConfig2.default)(_path2.default.join(process.cwd(), program.configFile));
  (0, _mkdirp2.default)(combinedMdwConfig.output);
  var template = _fs2.default.readFileSync(combinedMdwConfig.htmlTemplate).toString();
  var templatePath = _path2.default.join(process.cwd(), combinedMdwConfig.output, 'index.html');
  _fs2.default.writeFileSync(templatePath, _nunjucks2.default.renderString(template, { root: '/' }));
  //Now, this part are replaced by html-webpack-plugin!

  //Step 2: Generate entry js file by mdw config file
  generateEntryFile(combinedMdwConfig.theme, combinedMdwConfig.entryName, '/');
  var cwd = program.cwd;
  var mdwConfigFile = program.configFile;
  /* (1)receive custom webpack config, in order to manipulate our webpack config you must learn
    * how to write dora plugin to fullfill it! 
    * (2)if you want to define a user config, this config file must export an function because 
    *    dora-plugin-webpack will use it!
  */
  var doraConfig = (0, _assign2.default)({}, {
    cwd: _path2.default.join(process.cwd(), combinedMdwConfig.output),
    //dora server's cwd is from output folder
    port: combinedMdwConfig.port
  }, combinedMdwConfig.doraConfig);
  //add some plugins to dora server
  doraConfig.plugins = [
  /*
    *'middleware.before'
    *(1)get webpack.config.js from cwd or you can use config to override it! You own config file
    *   need to export as a function , our webpack config will input 
    *(2)second object will be used as parameter to this plugin as query
    *(3)use 'webpack.updateConfig' or 'webpack.updateConfig.finally' hook function to manipulate webpack configuration
    *   our default update config function will invoke between them , and default update function is from wcf
   
    *'middleware'
    *(1)use webpack function to bundle our files 
    *(2)inject 'koa-webpack-dev-middleware, that is because our middleware stage must return a middleware
    *
    * 'server-after':
    *(1)watch package.json and entry file for changing
    * 
   */
  [require.resolve('./plugins/dora-plugin-webpack'), {
    disableNpmInstall: true,
    cwd: cwd //must be correctly set
    //config:configFile, using this config to update default webpack config!
    // which can either export a function or object
  }], [_path2.default.join(__dirname, './plugins/dora-plugin-markdown'), {
    config: "" + mdwConfigFile
    // We must provide a configFile while dora-plugin-webpack is from wcf tool!
    // This file is user defined mdw config file. But you can use hook to 
    // update webpack config at the same time
  }], require('../lib/plugins/dora-plugin-browser-history')
  //This plugin is based on connect-history-api-fallback and dora server hook which used to 
  //Serve index.html while a invalid url is typed directly, we redirect it to index.html
  ];
  //const usersDoraPlugin = combinedMdwConfig.doraConfig.plugins || [];
  //user defined plugin in config file
  //doraConfig.plugins = doraConfig.plugins.concat(usersDoraPlugin);
  //all plugins
  //doraConfig.plugins.push(require.resolve('dora-plugin-livereload'));
  (0, _dora2.default)(doraConfig);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getRoutesPath, "getRoutesPath", "src/index.js");

  __REACT_HOT_LOADER__.register(generateEntryFile, "generateEntryFile", "src/index.js");

  __REACT_HOT_LOADER__.register(build, "build", "src/index.js");
}();

;
module.exports = exports["default"];