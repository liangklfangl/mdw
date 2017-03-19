import React,{cloneElement} from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {addLocaleData, IntlProvider} from "react-intl";
import enUS from "antd/lib/locale-provider/en_US";
import { LocaleProvider } from 'antd';
import enLocale from '../../en-US.js';
import cnLocale from '../../zh-CN.js';
import * as utils  from '../utils.jsx';
//Import four package for App internalization!
require("../../static/layout-index");
export default class Layout extends React.Component{
 constructor(props){
  super(props);
  const pathname = this.props.location.pathname;
  //we get pathname of URl
  const appLocale = utils.isZhCN(pathname) ? cnLocale : enLocale;
  //We choose which locale data we are now
  addLocaleData(appLocale.data);
  //We invoke addLocaleData of "react-intl"
   this.state ={
   	 isFirstScreen :true,
   	 appLocale,
   };
  this.onEnterChange.bind(this);
 }
 onEnterChange(){
 	console.log('onEnterChange');
 }
 render(){
  const {children, ...restProps} = this.props;
  //We separate children from this.props in case of warning generation
  //This is main Component to instantiate , other router config is child of this Component
  //We use cloneElement here to get a copy of child router
 const {appLocale,isFirstScreen} = this.state;
 //	Get state data
  return (
  	 <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
  	    <LocaleProvider locale={enUS}>
 		     <div id="content-container">
           <Header {...restProps}/>
            {
           	 cloneElement(children)
           	 //This is Home component and other child components below Layout Component
           }
           <Footer/>
         </div>
        </LocaleProvider>
     </IntlProvider>
 		)
    }
} 