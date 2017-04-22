"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSourceFileObject;
var R = require("ramda");
var fs = require("fs");
var path = require('path');
var rxSep = new RegExp("[" + path.sep + ".]");
//on windows is \
/**
 * [sourceFile description]
 * @param  {[type]} source [description]
 * @return {[type]}        [description]
 * Dealing with source configuration where to get markdown data
 */
function getSourceFileObject(source) {
  if (R.is(Object, source) && !Array.isArray(source)) {
    return R.mapObjIndexed(function (value) {
      return getSourceFileObject(value);
    }, source);
    //we only care about value not key
  } else {
    var markdownFiles = findMDFile(mustBeArray(source));
    //then we get an array like this: [ 'posts\\1.md', 'posts\\demos\\1.md' ]
    var filesTreeObject = filesToTreeStructure(markdownFiles);
    return filesTreeObject;
  }
}

/**
 * [filesToTreeStructure description]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function filesToTreeStructure(files) {
  return files.reduce(function (filesTree, filename) {
    // posts\demos\1.md,propLens:[posts,demos,1]
    var propLens = R.lensPath(filename.replace(/\.md$/i, '').split(rxSep));
    return R.set(propLens, filename, filesTree);
    //you get {"posts": {"demos": {"1": "posts/demos/1.md"}}}
  }, {});
}
/**
 * [isMDFile ensure to be markdown file]
 * @return {Boolean} [description]
 */
function isMDFile(filaname) {
  return path.extname(filaname) == ".md";
}
/**
 * [isDirectory description]
 * @return {Boolean} [description]
 */
function isDirectory(path) {
  return fs.statSync(path).isDirectory();
}
/**
 * [mustBeArray description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function mustBeArray(obj) {
  if (Array.isArray(obj)) {
    return obj;
  } else {
    return [obj];
  }
}

/**
 * [findMDFile description]
 * @return {[type]} [description]
 */
function findMDFile(source) {
  //R.chain will combine our arrays in array
  return R.pipe(R.filter(R.either(isDirectory, isMDFile)), R.chain(function (filename) {
    if (isDirectory(filename)) {
      var subFiles = fs.readdirSync(filename).map(function (subFile) {
        return path.join(filename, subFile);
      });
      return findMDFile(subFiles);
    }
    return [filename];
  }))(source);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(rxSep, "rxSep", "src/config/sourceManip.js");

  __REACT_HOT_LOADER__.register(getSourceFileObject, "getSourceFileObject", "src/config/sourceManip.js");

  __REACT_HOT_LOADER__.register(filesToTreeStructure, "filesToTreeStructure", "src/config/sourceManip.js");

  __REACT_HOT_LOADER__.register(isMDFile, "isMDFile", "src/config/sourceManip.js");

  __REACT_HOT_LOADER__.register(isDirectory, "isDirectory", "src/config/sourceManip.js");

  __REACT_HOT_LOADER__.register(mustBeArray, "mustBeArray", "src/config/sourceManip.js");

  __REACT_HOT_LOADER__.register(findMDFile, "findMDFile", "src/config/sourceManip.js");
}();

;
module.exports = exports["default"];