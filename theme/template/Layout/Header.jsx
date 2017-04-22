const styles = require("../../static/header.less");
import { Select, Menu, Row, Col, Icon, Button, Popover } from 'antd';
import { Link } from 'react-router';
import React from "react";
import ReactDOM from "react-dom";
export default class Header extends React.Component{
   //We dont need to invoke super method manually,this will also be set to prototype chain
   //https://github.com/liangklfangl/babel-compiler-extends
  state = {
     horizontal:true
  }
  /**
   * [componentDidMount Hook function for display mode update]
   * @return {[type]} [description]
   */
  componentDidMount(){
    require('enquire.js').register('only screen and (min-width:320px) and (max-width:940px)',{
      match:()=>{
         this.setState({horizontal:false})
      },
      unmatch:()=>{
        this.setState({horizontal:true});
      }
    });
  }
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render(){
  const {horizontal} = this.state; 
  //We get mode of menu
  const mode = horizontal ? "horizontal" :"inline";
  const menus = [
     <Menu mode={mode}>
       <Menu.Item key="item1">首页</Menu.Item>
       <Menu.Item key="item2">指导</Menu.Item>
       <Menu.Item key="item3">组件</Menu.Item>
       <Menu.Item key="item4">模式</Menu.Item>
       <Menu.Item key="item5">资源</Menu.Item>
     </Menu>
  ];
  const searchText = "搜索...";
  const searchContent = [] ;
  //This is generated automatically
  //If gutter of Row is set as 16, then padding-left and padding-right of element will all be set 8px!
  //With chrome devTool, we will see that https://ant.design/components/grid-cn/
    return (
         <div className="header">
             <Row>
                <Col  lg={4} md={6} sm={24} xs={24} style={{border:"1px solid red"}}>
                  <Link id="logo">
                    <img id="banner" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg"/>
                    <span className="corp">阿里数娱</span>
                  </Link>
                </Col>
                <Col lg={20} md={18} sm={0} xs={0} style={{border:'2px solid red'}}>
                 <div id="search-box">
                  <Select combobox placeholder={searchText}>
                     {searchContent}
                  </Select>
                 </div>
                 {mode == "horizontal" ? menus :null}
                </Col>
             </Row> 
         </div>
        )
  }
}
