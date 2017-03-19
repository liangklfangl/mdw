const path = require('path');
const fs = require('fs');
const nunjucks = require('nunjucks');
/**
 * [generateHtml description]
 * @param  {[type]} htmlTemplate [description]
 * @param  {[type]} publicPath   [description]
 * @return {[type]}              [description]
 */
export default function generateHtml(htmlTemplate,output,publicPath){
	const filePath = path.resolve(htmlTemplate);
   if(!fs.existsSync(filePath)){
	   	throw new Error("html template not found!");
	  }
  const template = fs.readFileSync(htmlTemplate).toString();
  const templatePath = path.resolve(output,"index.html");
  // htmlTemplate: "./theme/index.html",
  fs.writeFileSync(templatePath, nunjucks.renderString(template, { root: publicPath }));
  //using nunjucks to replace variables in html template
}