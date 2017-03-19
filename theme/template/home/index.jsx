import React from "react";
import styles from "../../static/layout-index";
export default class Home extends React.Component{
 constructor(props){
 	super(props);
 }
 render(){
 	return (
          <div className={styles.content}>Home page</div>
 		)
 }
} 