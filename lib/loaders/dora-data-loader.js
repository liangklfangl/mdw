'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _getConfig = require('../utils/getConfig');

var _getConfig2 = _interopRequireDefault(_getConfig);

var _markdownData = require('../utils/markdownData');

var _markdownData2 = _interopRequireDefault(_markdownData);

var _resolvePlugins = require('../utils/resolvePlugins');

var _resolvePlugins2 = _interopRequireDefault(_resolvePlugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = require("util");
module.exports = function bishengDataLoader() /* content */{
  if (this.cacheable) {
    this.cacheable();
  }
  var webpackRemainingChain = _loaderUtils2.default.getRemainingRequest(this).split('!');
  var fullPath = webpackRemainingChain[webpackRemainingChain.length - 1];
  //absolute path of this file
  var query = _loaderUtils2.default.getOptions(this);
  var config = (0, _getConfig2.default)(query.config);
  //Then we get config file specified
  var markdown = _markdownData2.default.generate(config.source);
  //We get markdown tree object by config.source
  var browserPlugins = (0, _resolvePlugins2.default)(config.plugins, 'browser');
  //We deal with every plugin's `browser` part
  var pluginsString = browserPlugins.map(function (plugin) {
    return 'require(\'' + plugin[0] + '\')(' + (0, _stringify2.default)(plugin[1]) + ')';
  }).join(',\n');
  // console.log("pluginsString=",pluginsString);
  //Combine `browser` part into string
  var picked = {};
  if (config.pick) {
    var nodePlugins = (0, _resolvePlugins2.default)(config.plugins, 'node');
    // console.log('markdown=====',util.inspect(markdown,{showHidden:true,depth:4}));
    //We get `node` mode
    _markdownData2.default.traverse(markdown, function (filename) {

      //We traverse our markdown tree object
      var fileContent = _fs2.default.readFileSync(_path2.default.join(process.cwd(), filename)).toString();
      //We get file content
      var parsedMarkdown = _markdownData2.default.process(filename, fileContent, nodePlugins);
      //filename is absolute path here
      (0, _keys2.default)(config.pick).forEach(function (key) {
        if (!picked[key]) {
          picked[key] = [];
        }
        var picker = config.pick[key];
        var pickedData = picker(parsedMarkdown);
        //If pick is configured, we will process markdown tree object with all `node` part to generate
        //jsonml, then we put jsonml to every function of pick object. If something returned, we will 
        //push it to picked object, then return!
        if (pickedData) {
          picked[key].push(pickedData);
        }
      });
    });
  }
  // fs.writeFile('./function.js',`[\n${pluginsString}\n]` , (err) => {
  //   if (err) throw err;
  //   console.log('写plugin函数成功');
  // });
  // console.log('picked=====',util.inspect(picked,{showHidden:true,depth:4}));
  //markdown is tree object
  //plugins is all `browser` plugins string, it is an array joined width ","
  //picked is picked object as above
  var result = 'var Promise = require(\'bluebird\');\n' + 'module.exports = {' + ('\n  markdown: ' + _markdownData2.default.stringify(markdown, config.lazyLoad) + ',') + ('\n  plugins: [\n' + pluginsString + '\n],') + ('\n  picked: ' + (0, _stringify2.default)(picked, null, 2) + ',') + '\n};';
  return result;
};
// module.exports = {
//   markdown: {
//   'components': {
//     'alert': {
//       'demo': {
//         'banner': require('C:/Users/Administrator/Desktop/mdw/components/alert/demo/banner.md'),
//         'basic': require('C:/Users/Administrator/Desktop/mdw/components/alert/demo/basic.md'),
//         'closable': require('C:/Users/Administrator/Desktop/mdw/components/alert/demo/closable.md'),
//         'close-text': require('C:/Users/Administrator/Desktop/mdw/components/alert/demo/close-text.md'),
//         'description': require('C:/Users/Administrator/Desktop/mdw/components/alert/demo/description.md'),
//         'icon': require('C:/Users/Administrator/Desktop/mdw/components/alert/demo/icon.md'),
//         'style': require('C:/Users/Administrator/Desktop/mdw/components/alert/demo/style.md'),
//       },
//       'index': require('C:/Users/Administrator/Desktop/mdw/components/alert/index.md'),
//     },
//   }
//  }
// }

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;