'use strict';

var _babylon = require('babylon');

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transformer = require('../plugins/dora-plugin-preview/lib/transformer');
var marktwain = require("../loaders/markdown-data-loader!./jsonml.md");
// const jsonml =["pre",
//     {"lang":'js'},
// 	["code",
// 	  { "style" : "color:red" },
// 	  ["console.log(1)"]
// 	]
// ]
var ast = transformer(jsonml, 'js');
console.log('ast:', _util2.default.inspect(ast, { showHidden: true, depth: 5 }));