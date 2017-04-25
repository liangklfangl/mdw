import path from "path";
import resolvePlugin from "../utils/resolvePlugins";
import  loaderUtils from "loader-utils";
import getConfig from "../utils/getConfig";
const util = require('util');
import processMardown from "../utils/markdownData";
/**
 * [stringify markdown data]
 * @param  {[type]} node  [description]
 * @param  {Number} depth [description]
 * @return {[type]}       [description]
 * Sometimes , input as: 
 * { content: [ 'article', [ 'h3', '1.md' ] ],
     meta: { filename: 'md\\index.md' } 
   }
   Then we get follows:
  {
  "content": [
    "article",
    [
      "h3",
      "1.md"
    ]
  ],
  "meta": {
    "filename": "md\\index.md"
  }
}
 */
function stringify(node, depth = 0) {
  const indent = '  '.repeat(depth);
  if (Array.isArray(node)) {
    return `[\n` +
      node.map(item => `${indent}  ${stringify(item, depth + 1)}`).join(',\n') +
      `\n${indent}]`;
  }
  if (
    typeof node === 'object' &&
      node !== null &&
      !(node instanceof Date)
  ) {
    // if (node.__BISHENG_EMBEDED_CODE) {
    //   return node.code;
    // }
    return `{\n` +
      Object.keys(node).map((key) => {
        const value = node[key];
        return `${indent}  "${key}": ${stringify(value, depth + 1)}`;
      }).join(',\n') +
      `\n${indent}}`;
  }
  return JSON.stringify(node, null, 2);
}

//source is content of markdown file
module.exports = function(source) {
	if(this.cacheable){
		this.cacheable();
	}
  const webpackRemainingChain = loaderUtils.getRemainingRequest(this).split('!');
  //here we can get  'C:\\Users\\Administrator\\Desktop\\mdw\\readme.md?sex'
  const fullPath = webpackRemainingChain[webpackRemainingChain.length - 1];
  const filename = path.relative(process.cwd(), fullPath);
  // relative path
  const query = loaderUtils.getOptions(this);
  //get query config file of this loader, returned an object
  const plugins = getConfig(query.config).plugins;
  //combine user defined and default config
  const resolvedNodePlugins = resolvePlugin(plugins,"node");
  //we get "node" module of plugins
  // console.log('webpack真正加载md文件的时候plugins==========',util.inspect(resolvedNodePlugins,{showHidden:true,depth:1}));
  let parsedMarkdown = processMardown.process(filename,source,resolvedNodePlugins);
   // console.log("处理后的parsedMarkdown为",parsedMarkdown);
   //      console.log("---------------------------------------");
  //filename is absolute path of md file while source is content , resolvedNodePlugins is used to 
  //further process markdown content. Meta part of markdown data include filename . We now get 
  //mark-twain data. In detail http://www.jsonml.org/
  // console.log('webpack真正加载md文件的时候==========',util.inspect(parsedMarkdown,{showHidden:true,depth:3}));
  return `module.exports = ${stringify(parsedMarkdown)}`;
};
