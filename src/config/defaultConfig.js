const path =  require("path");
module.exports = {
  port: 8000,
  source: './posts',
  //if is a object ,we only care about key
  /*
  if(R.is(Object,source) && !Array.isArray(source)){
  	return R.mapObjIndexed((value)=>getSourceFileObject(value),source)
  }
   */
  output: './site',
  //output folder
  theme: './theme',
  htmlTemplate: "./theme/index.html",
  publicPath : '/assets/',
  //publicPath for assets 
  plugins: ['hello'],
  //shallow copy by lodash
  doraConfig: {},
  entryName: 'index'
}