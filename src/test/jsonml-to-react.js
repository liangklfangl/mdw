import {parse} from 'babylon';
import generate from 'babel-generator';
import util from 'util';
const transformer = require('../plugins/dora-plugin-preview/lib/transformer');
const marktwain = require("../loaders/markdown-data-loader!./jsonml.md");
// const jsonml =["pre",
//     {"lang":'js'},
// 	["code",
// 	  { "style" : "color:red" },
// 	  ["console.log(1)"]
// 	]
// ]
const ast = transformer(jsonml,'js');
console.log('ast:',util.inspect(ast,{showHidden:true,depth:5}))