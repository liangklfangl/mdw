const path = require("path");
const fs  = require('fs');
import  getSourceFileObject  from "./sourceManip.js";
import generateDir from "./outputManip";
import generateHtml from "./htmlManip";
const class2type = {};  
import _ from "lodash";
const toString = class2type.toString;    
const hasOwn = class2type.hasOwnProperty;
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(name, i) {  
class2type[ "[object " + name + "]" ] = name.toLowerCase();  
});  
let sourceFileTree={};
/**
 * [mergeCustomConfig description]
 * @param  {[type]} defaultConfig [description]
 * @param  {[type]} customConfig  [description]
 * @return {[type]}               [description]
 */
export default function deltConfig(defaultConfig,customConfig){
 if(type(customConfig) == "object"){
	 _.extend(defaultConfig, customConfig);
  }else{
  	//with no custom config file ,we skip it!
  	if(customConfig){
  		const filePath = path.resolve(customConfig);
	   if(!fs.existsSync(filePath)){
	   	throw new Error("Custom config file not exist!");
	   }
	  _.extend(defaultConfig, require(filaPath));
  	}
 }
 //we get the final config here, then we need to deal with.
 sourceFileTree = getSourceFileObject(defaultConfig.source);
 //delt width source config to get a  fileTreeStructure
 generateDir(defaultConfig.output);
 //delt with output config to generate a folder
 generateHtml(defaultConfig.htmlTemplate,defaultConfig.output,defaultConfig.publicPath);

 return defaultConfig;
}


/**
 * [type description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function type(obj){
 if ( obj == null ) {  
	return obj + "";  
 }  
 return typeof obj === "object" || typeof obj === "function" ?  
	class2type[ toString.call(obj) ] || "object" :  
	typeof obj;  
}