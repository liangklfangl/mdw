import fs from 'fs';
import path from 'path';
import loaderUtils from  'loader-utils';
import getConfig from '../utils/getConfig';
import markdownData from '../utils/markdownData';
import resolvePlugins from '../utils/resolvePlugins';
const util = require("util");
module.exports = function bishengDataLoader(/* content */) {
  if (this.cacheable) {
    this.cacheable();
  }
  const webpackRemainingChain = loaderUtils.getRemainingRequest(this).split('!');
  const fullPath = webpackRemainingChain[webpackRemainingChain.length - 1];
  //absolute path of this file
  const query = loaderUtils.getOptions(this);
  const config = getConfig(query.config);
  //Then we get config file specified
  const markdown = markdownData.generate(config.source);
  //We get markdown tree object by config.source
  const browserPlugins = resolvePlugins(config.plugins, 'browser');
  //We deal with every plugin's `browser` part
  const pluginsString = browserPlugins.map(
    (plugin) =>
      `require('${plugin[0]}')(${JSON.stringify(plugin[1])})`
  ).join(',\n');
  // console.log("pluginsString=",pluginsString);
 //Combine `browser` part into string
  const picked = {};
  if (config.pick) {
    const nodePlugins = resolvePlugins(config.plugins, 'node');
    // console.log('markdown=====',util.inspect(markdown,{showHidden:true,depth:4}));
    //We get `node` mode
    markdownData.traverse(markdown, (filename) => {

    //We traverse our markdown tree object
     const fileContent = fs.readFileSync(path.join(process.cwd(), filename)).toString();
      //We get file content
      const parsedMarkdown = markdownData.process(filename, fileContent, nodePlugins);
      //filename is absolute path here
      Object.keys(config.pick).forEach((key) => {
        if (!picked[key]) {
          picked[key] = [];
        }
        const picker = config.pick[key];
        const pickedData = picker(parsedMarkdown);
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
  const result =   'var Promise = require(\'bluebird\');\n' +
    'module.exports = {' +
    `\n  markdown: ${markdownData.stringify(markdown, config.lazyLoad)},` +
    `\n  plugins: [\n${pluginsString}\n],` +
    `\n  picked: ${JSON.stringify(picked, null, 2)},` +
    `\n};`;
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
