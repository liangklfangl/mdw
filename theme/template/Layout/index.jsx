import React from "react";
import Header from "./Header";
import Footer from "./Footer";
const styles = require("../../static/page.less");
export default class Page extends React.Component{
 
 render(){
 	 return (
         <div className="page">
               <Header/>
               {this.props.children}
              <Footer/>
         </div>
 	 	)
  }

}