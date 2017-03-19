import React from "react";
export default class ComponentDoc extends React.Component{
  constructor(props){
  	super(props);
  }

  render(){

  	const props = this.props;
  	console.log('ComponentDoc:',props);
  	return (

             <div>This is ComponentDoc</div>
  		  )
  }
}