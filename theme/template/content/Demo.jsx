import React from "react";
import ReactDOM from "react-dom";
const styles = require("../../static/demo.less");
const hightlight = require("../../static/highlight");
import { getChildren } from 'jsonml.js/lib/utils';
import classNames from 'classnames';
import {Icon} from "antd";
import { is } from 'immutable';
import EditButton from "./EditButton";
// import {Select} from "../../../components/index.js";
// function jsonmlReactLoader() {
//     var props = { url: "http://mytv-test.alibaba.net/common/jsonp/getYoukuPerson.htm", style: { width: "200px" }, method: 'post',
//       query: { fetchKey: "keyword" }, data: ["data", 'users'], //对象路由
//       updater: function updater(item) {
//         return item.personname;
//       }, //该函数表示选中一行的时候应该选中哪一个字段在文本框中显示
//       showHtml: function showHtml(rowData) {
//         var thumburl = rowData.thumburl;
//         var personname = rowData.personname;
//         var personid = rowData.personid;
//         return "<img style='vertical-align:middle' src=" + thumburl + "></img>" + "<span>" + personid + "</span>" + "<span style='width:80px;'>" + personname + "</span>";
//       } };
//       return React.createElement(_index.Select, props);
//   }
    //(5)直接这么写就可以了 <Select {...props}/>
    //(4)无法选择是antd的版本不对
    //(3) 打包好组件，然后放在我们的components.js中，此时class被编译为函数，那么我们直接export的就是函数
    //    可以把components/index.js单独作为一个文件打包，即作为webpack的入口文件
    //(2)  {<Select {...props}/>}这种方式相当于cannot call a class as function
    //(1)document.getElementById("code-box-demo")的元素根本不存在，无法通过这种方式插入，因为他是react节点
    // return ReactDOM.render(<Select {...props}/>,document.getElementById("code-box-demo"));
  //    return new Select(props);
  // }
// const highlightStyleMock = require("../../../mock/highlightStyle");
const R = require("ramda");

export default class Demo extends React.Component {
   constructor(props){
     super(props);
   }
    state = {
   	  codeExpand:false
     };
   //panel收缩张开
   handleCodeExpand = ()=>{
     this.setState({codeExpand : !this.state.codeExpand});
   }
   //父组件传递了codeExpand也要重新渲染子组件，这种情况只有在都是布尔值的情况下可用
   //this.state.codeExpand || this.props.codeExpand表示上次组件的状态~
   //nextProps.codeExpand || nextState.codeExpand表示组件的下次状态~
  shouldComponentUpdate(nextProps,nextState){
    // 如果代码codeExpand属性发生了变化，那么要求整个Demo组件重新渲染，其实还是有点问题的，因为此时只有个别DOM发生变化
    if ((this.state.codeExpand || this.props.codeExpand)!==(nextProps.codeExpand || nextState.codeExpand)){
      return true;
    }
    if(R.keys(nextProps).length !==R.keys(this.props).length){
      return true;
    }
   for (const key in nextProps) {
    //前面用于判断简单数据类型,后面用于判断this.props中每一个属性是否发生了引用变化
    //因为每一个Demo接收到的DemoData其实是这个Demo所有的数据，也就是每一个Demo(如basic,button-group等)~~
    if (this.props[key] !== nextProps[key] ||!is(this.props[key], nextProps[key])) {
      return true;
    }
  }
   return false;
 }
  render(){
    // console.log('jsonmlReactLoader调用返回的对象',jsonmlReactLoader());

  console.log("demo组件接收到的数据this.props",this.props);
    //我们手动添加highlightStyle
  const {content,highlightedCode,meta,preview,src,demoCodeForBack} = this.props;
	 //详见dora-plugin-antd，content是一个对象有{zh-CN:{},en-US:{}}属性(Demo页面含有中文和英文两部分)
	 //highlightedCode是demo页面中的"pre标签"与pre标签含有的jsx语言和hightlighted属性(通过prisme高亮显示)
   const {highlightedStyle, style} = this.props;
   //获取到我们在demo里面写入内联style(调控demo的样式)和highlightedStyle(已经高亮的用于原样显示的代码)
	 const utils = this.props.utils;
	 const localTitle = meta.title["zh-CN"];
	 //获取title
	 const localContent = content["zh-CN"];
	 //直接调用我们的元素的toReactComponent就可以了，其中处理的逻辑通过dora-plugin-highlighted来完成
  // const liveDemo = meta.iframe ? <iframe src={src}/> :this.props.preview(React, ReactDOM);
    // const liveDemo = meta.iframe ? <iframe src={src}/> :jsonmlReactLoader()
   //表示用户希望是采用iframe形式来展示页面
   // console.log('liveDemo=====>',liveDemo);
	 const { codeExpand } = this.props;
   //父组件传递过来codeExpand
   const classHighlightCode = classNames({
         'code-box': true,
          expand: this.state.codeExpand || codeExpand,
	 });
   const liveCode = demoCodeForBack || highlightedCode || "";
   //如果有demoCodeForBack表示是兼容后台的页面，否则就是正常页面
   const highlightedWrapperClss = classNames({
      'highlight-wrapper': true,
      'highlight-wrapper-expand': this.state.codeExpand || codeExpand,
   });
   //高亮显示的代码部分
     return (
      <div className={classHighlightCode}>
         <div  className="code-box-demo" id="code-box-demo">
          {this.props.preview(React, ReactDOM)}
           <If condition={style}>
             {
               <style dangerouslySetInnerHTML={{ __html: style }}/>
             }
           </If>
         </div>
         <div className="code-title-wrapper">
          <div className="code-title">{localTitle}</div>
          <EditButton title="github上编辑" filename="http://github.com"/>
         </div>
          <div className="code-content-description">{localContent}</div>
           <Icon type="down-circle-o" title="Show Code" className="collapse" onClick={this.handleCodeExpand} />
          <div className={highlightedWrapperClss}>
               {utils.toReactComponent(liveCode)}
              <If condition={highlightedStyle}>
               <div key="style" className="highlight">
                  {/*toReactComponent只有显示属性中hightlight属性的功能，见dora-plugin-highlight*/}
                   <pre>
                      <code dangerouslySetInnerHTML={{__html:highlightedStyle}}>
                      </code>
                   </pre>
                </div>
              </If>
          </div>
      </div>
  	)
   }
}
