import React from "react";
export default class Demo extends React.Component{
  constructor(props){
  	super(props);
  }

  render(){

  	const props = this.props;
  	console.log('Demo:',props);
  	return (

             <div>This is Demo</div>
  		  )
  }
}