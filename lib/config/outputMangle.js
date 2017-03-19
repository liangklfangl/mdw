'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = generateDir;
var path = require('path');
var fs = require('fs');
var mkdirp = require("mkdirp");
function generateDir(outputFile) {
	var filePath = path.resolve(outputFile);
	mkdirp(filePath, function (err) {
		if (err) console.error("output destination invalid", err);else {}
	});
}
module.exports = exports['default'];