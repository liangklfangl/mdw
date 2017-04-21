const path = require('path');
const processDoc = require('./process-doc');
const processDemo = require('./process-demo');
/**
 * [description]
 * @param  {[type]}  markdownData [Processed jsonml data of previous plugin(plugin can inject loader of 'node' module)]
 * @param  {[type]}  _            [description]
 * @param  {Boolean} isBuild      [description]
 * @return {[type]}               [description]
 */
module.exports = (markdownData, _, isBuild) => {
  const isDemo = /\/demo$/i.test(path.dirname(markdownData.meta.filename));
  if (isDemo) {
  	//componnents/button/demos`s markdown files
    return processDemo(markdownData, isBuild);
  }
  //components/button`s doc files
  return processDoc(markdownData);
};
