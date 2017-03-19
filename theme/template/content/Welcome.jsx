import React from "react";

export default class Welcome extends React.Component{
  constructor(props){
  	super(props);
  	 this.state = {
  	  name:'qinliang',
  	  sex :'male'
     }
  }
  render(){
  	return(
  		   <div id="hello">
             这里是Welcome页面!
             {this.props.children}
             {/*这里要实例化Children组件*/}
           </div>
  		)
  }
} 
