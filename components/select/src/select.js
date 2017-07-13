import { Select, Input } from 'antd';
import querystring from 'querystring';
import React from "react";
import ReactDOM from "react-dom";
import { parsepx2num ,isEmptyObject} from "./util";
// import mock from "./mock.js";
const reqwest = require('reqwest');
const Option = Select.Option;
const styles = require('./index.less');
const exist = require('exist.js');
require('arrive');
let timeout;
let currentValue;
window.SELECTS =[];
// const attr =  {
//     url:"http://mytv-test.alibaba.net/common/jsonp/getYoukuPerson.htm",
//     style:{
//       width:"250px",
//       marginLeft:"50px",
//       marginTop:'200px',
//     },
//     method:'post',
//     query:{
//       fetchKey:"keyword"
//     },
//     data:["data",'users'],
//     //对象路由
//     updater:function(item){
//      return item.personname;
//     },
//     //该函数表示选中一行的时候应该选中哪一个字段在文本框中显示
//     showHtml:function(rowData){
//       var thumburl = rowData.thumburl;
//       var personname = rowData.personname;
//       var personid = rowData.personid;
//       var result  = '<img  src="'+thumburl+'"/>'+"<span>"+personid+"</span>"+"<span style='width:80px;'>"+personname+"</span>"
//       return result
//     }
//   }
/**
 * SearchInput组件
 */
export default class SearchInput extends React.Component {

 constructor(props){
    super(props);
      this.state = {
      data: {},
      value: this.props.inputVl,
      isFirstSceen: true,
      hiddenVl : this.props.inputVl
    }
    this.fetch = this.fetch.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
/**
 * 根据用户输入的值访问某一个url获取数据
 * @param  {[type]}   value    [用户输入]
 * @param  {Function} callback [回调]
 * (1)甚至还有请求是返回xml的，这些我都不会处理的
 * (2)ajaxSetup等方法我也是不处理的，他的那个组件直接调用$.ajax可以处理
 */
 fetch(value,url,callback){
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  let extraQs = this.props.query;
  const queryConst = {};
  queryConst[extraQs.fetchKey] = value;
  const str = querystring.encode(queryConst);
  const ajaxObj = {
      url: this.props.url +"?"+ `${str}`
    , type: this.props.type || 'jsonp'
    , method: this.props.method || "get"
     }

 function fake() {
   reqwest(ajaxObj).then((d)=>{
      if(typeof d!=='object'){
        d = JSON.parse(d);
      }
      if(currentValue === value){
         callback(exist.get(d,this.props.data));
      }
    }).catch(function(ex){
       console.log('接口报错:',ex);
    })

  }
  timeout = setTimeout(fake.bind(this), 300);
  //两次间隔如果小于300ms，那么我们不会发送前一个请求
 }
/**
 * 选中某一项的时候触发，传入的是options的value
 */
onSelect(rowIndex){
  const selectedValue = this.state.data[rowIndex];
  const selectVu = this.props.updater(selectedValue);
  this.setState({value : selectVu});
  this.setState({hiddenVl:selectVu});
}
 /**
  * value表示用户在输入框输入值,或者选中的时候都会触发
  */
  handleChange = (value) => {
    this.setState({ value });
    this.fetch(value, this.props.url,data => this.setState({ data }));
  }
  /**
   * 判断是否是首次加载
   * @return {[type]} [description]
   */
  componentDidMount(){
    this.state.isFirstSceen = false;
  }
  render() {
    let { style={width:200,height:100},placeholder="input search text"}  = this.props;
    style = parsepx2num(style);
    let searchResults,optionText;
    //将所有的数据抛给使用者，使用者自己去拼接，但是首次不会去拉取数据，所以也不会执行这里的代码
    //首次加载我们的Options是空，以后每次render都会去服务端拉取数据
    //(2)如果两次之间小于300ms，那么第一次不会setState，导致我们的this.state.data为空对象
    if(!this.state.isFirstSceen && !isEmptyObject(this.state.data)){
      const items = this.state.data;
       searchResults = items.map((item,i)=>{
          optionText = this.props.showHtml(this.state.data[i]);
           return (
              <Option key={i}>
                <div className='option_item_flex'  dangerouslySetInnerHTML={{__html:optionText}}>
                </div>
              </Option>
         )
       });
    }
    return (
    <div>
      <Input type="hidden" id={this.props.inputName} name={this.props.inputName} value={this.state.hiddenVl}/>
      <Select
        mode="combobox"
        //选中的value
        placeholder={placeholder}
        //设置占位符
        value ={this.state.value }
        notFoundContent=""
        style={style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSelect={this.onSelect}
        //选中的时候调用，Select框中显示选中的option的value值
        onSearch={this.handleChange}
        //onChange选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
        //（1）当你在input框中输入数据的时候会持续触发，如输入"abc"实际上会调用3次
        //（2）选中了某一个option值也会调用
        //如果onChange+onSelect一起使用会存在问题，选中一个选项的时候既会调用onSelect也会调用onChange
      >
        {searchResults}
      </Select>
    </div>
    );
  }
}
//(1)我不知道每一行数据的真实的数据本身，所以无法通过setState来设置select框的值this.state.value
class NewSelect{

 /**
  * 如果需要动态添加的功能必须调用Selector.invokeAdd(selector)方法。不要放在constructor中，否则
  * 每次实例化都会执行。目的：为新添加的DOM注册事件，每次新插入指定的selector的DOM元素都为这个DOM元素
  * 实例化一个Selector。但是如果add的时候是有多个selector，那么这里就必须是selector数组
  */
  static invokeAdd (selectors){
    selectors.forEach((selector)=>{
       document.arrive(selector,function(){
        SELECTS.forEach((select)=>{
           if(select.data.domClssSelector == selector){
                ReactDOM.render(<SearchInput {...select.data}/>,this);
           }
        })
        //this.className.split(" ")表示添加的DOM节点的class数组
          // const addDOMClss = this.className.split(" ");
          // console.log('this.className.split(" ")===',);
          // if(this.id===selector || (selector in this.className.split(" ")!==-1))
          // {


          // }
       });
    });

  }
  constructor(mountNode,params){
   const inputVl = mountNode.getAttribute('data-value');
   const inputName = mountNode.getAttribute('data-name');
   const placeholder = mountNode.getAttribute('placeholder');
   mountNode.style.display="inline-block";
   const domClssSelector = "."+mountNode.className;
   //获取className得到你此次实例化的时候传入的配置项
   const selector = {inputVl,inputName,placeholder,domClssSelector,...params};

   SELECTS.push({data:selector});
   //模仿input成为inline-block元素
    ReactDOM.render(<SearchInput  {...params} inputName={inputName} placeholder={placeholder} inputVl={inputVl}/>,mountNode);

  }
}

window.Select = NewSelect;

