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
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(generateDir, 'generateDir', 'src/config/outputManip.js');
}();

;
module.exports = exports['default'];