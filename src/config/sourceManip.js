const R = require("ramda"); 
const fs = require("fs");
const path = require('path');
const rxSep = new RegExp(`[${path.sep}.]`);
//on windows is \
/**
 * [sourceFile description]
 * @param  {[type]} source [description]
 * @return {[type]}        [description]
 * Dealing with source configuration where to get markdown data
 */
export default function getSourceFileObject(source){
  if(R.is(Object,source) && !Array.isArray(source)){
  	return R.mapObjIndexed((value)=>getSourceFileObject(value),source)
  	//we only care about value not key
  }else{
     const markdownFiles = findMDFile(mustBeArray(source));
     //then we get an array like this: [ 'posts\\1.md', 'posts\\demos\\1.md' ]
     const filesTreeObject = filesToTreeStructure(markdownFiles);
     return filesTreeObject;
  }

}

/**
 * [filesToTreeStructure description]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function filesToTreeStructure(files){
   return files.reduce((filesTree, filename) => {
    // posts\demos\1.md,propLens:[posts,demos,1]
    const propLens = R.lensPath(filename.replace(/\.md$/i, '').split(rxSep));
    return R.set(propLens, filename, filesTree);
    //you get {"posts": {"demos": {"1": "posts/demos/1.md"}}}
  }, {});
}
/**
 * [isMDFile ensure to be markdown file]
 * @return {Boolean} [description]
 */
function isMDFile(filaname){
  return path.extname(filaname)==".md";
}
/**
 * [isDirectory description]
 * @return {Boolean} [description]
 */
function isDirectory(path){
  return fs.statSync(path).isDirectory();
}
/**
 * [mustBeArray description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function mustBeArray(obj){
  if(Array.isArray(obj)){
  	 return obj;
  }else{
  	return [obj];
  } 
}

/**
 * [findMDFile description]
 * @return {[type]} [description]
 */
function findMDFile(source){
	//R.chain will combine our arrays in array
 return R.pipe(
    R.filter(R.either(isDirectory, isMDFile)),
    R.chain((filename) => {
      if (isDirectory(filename)) {
        const subFiles = fs.readdirSync(filename)
                .map((subFile) => path.join(filename, subFile));
        return findMDFile(subFiles);
      }
      return [filename];
    })
  )(source);
}