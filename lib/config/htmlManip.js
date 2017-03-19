'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateHtml;
var path = require('path');
var fs = require('fs');
var nunjucks = require('nunjucks');
/**
 * [generateHtml description]
 * @param  {[type]} htmlTemplate [description]
 * @param  {[type]} publicPath   [description]
 * @return {[type]}              [description]
 */
function generateHtml(htmlTemplate, output, publicPath) {
  var filePath = path.resolve(htmlTemplate);
  if (!fs.existsSync(filePath)) {
    throw new Error("html template not found!");
  }
  var template = fs.readFileSync(htmlTemplate).toString();
  var templatePath = path.resolve(output, "index.html");
  // htmlTemplate: "./theme/index.html",
  fs.writeFileSync(templatePath, nunjucks.renderString(template, { root: publicPath }));
  //using nunjucks to replace variables in html template
}
module.exports = exports['default'];