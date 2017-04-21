import React from "react";
import MainContent from "./MainContent.jsx";
/**
 * [collect Method invoked before component instantiation, after callback invoked, we get props for component]
 * @param  {[type]}   nextProps [description]
 * @param  {Function} callback  [First parameter is error while second is something to Component while instantiation!]
 * @return {[type]}             [description]
 * 
   Signiture of First parameter:
   Object.assign({}, nextState, {
        data: data.markdown,
        picked: data.picked,
        pageData,
        //page data is for special html page based on url
        utils,
        //get method is from exist.get
      })
 */
export function collect(nextProps, callback) {
const pathname = nextProps.location.pathname;
const pathArray = pathname.split('/').filter((elem)=>{
   return elem;
});
//nextState also asiged to first parameter, we can get it.
//Props also assiged to Component with createElement function with dynamic key as location.pathname
const pageData = nextProps.pageData;
//data for special html page getting by exist.get with pathname
if(!pageData){
  callback(404,nextProps);
  return;
}
//we put all data to NotFound component without manipulation
const demos = nextProps.utils.get(nextProps.data,[...pathArray,'demos']);
//We get all demos object by exist.get method
//Last step: We need to put props to component  while instantiation
callback(null,{
  ...nextProps,//complete data received
  demos:demos,//Demo part of each component
  pageData:pageData
});
}

//Data in callback funciton will be all passed to MainContent component
export default (props) => {
  console.log('contentTmpl',props);
  return <MainContent {...props} />;
};
