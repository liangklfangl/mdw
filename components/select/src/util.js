const rdashAlpha = /-([a-z]|[0-9])/ig;
const rmsPrefix = /^-ms-/;
const avoidNumAttr = ["margin",'width','height','padding'];
const class2type = {};
const toString = class2type.toString;
const hasOwn = class2type.hasOwnProperty;

"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(name,index){
  class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

const fcamelCase = function( all, letter ) {
return ( letter + "" ).toUpperCase();
};

//判断元素类型
function type( obj ) {
  if ( obj == null ) {
  return obj + "";
  }
  return typeof obj === "object" || typeof obj === "function" ?
  class2type[ toString.call(obj) ] || "object" :
  typeof obj;
}

//attr是某一个属性，用于判断该属性是不是数字属性
const isNumberAttr = function(attr){
  for(let i =0,len=avoidNumAttr.length;i<len;i++){
    if(attr.indexOf(avoidNumAttr[i])!==-1){
      return true;
    }
  }
  return false;
}
/**
 * 转驼峰
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
function camelCase( string ) {
 return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
/**
 * 将用户输入的含有px单位的style对象转化为纯数字对象
 * @param  {[type]} styleObj [description]
 * @return {[type]}     [description]
 */
function parsepx2num(styleObj){
 const keys = Object.keys(styleObj);
 const numdStyle = {};
 keys.forEach(function(elm){
  //marginLeft,margin-left
    if(isNumberAttr(elm)){
      numdStyle[camelCase(elm)] = parseInt(styleObj[elm]);
    }else{
          numdStyle[camelCase(elm)] = styleObj[elm];
    }
 });
 return numdStyle;
}

/**
 * 是否是空对象
 */
function isEmptyObject( obj ) {
 let name;
 for ( name in obj ) {
    return false;
  }
  return true;
}

module.exports = {
  parsepx2num,
  detectType : type,
  isEmptyObject
}


