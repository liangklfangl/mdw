import React from 'react';
import { DatePicker as  DatePickerAnt} from 'antd';
import moment from 'moment';
import style from './index.less';


const { MonthPicker, RangePicker } = DatePickerAnt;

export default class Cpnt extends React.Component {
  getRenderByType(type, params){
      if(type == 'monthpicker'){
        return <MonthPicker {...params} />
      }else if(type == 'rangepicker'){

        let format = 'YYYY-MM-DD';
        if(params.showTime){
            format = 'YYYY-MM-DD HH:mm:ss';
            params.format = format;
        }
        if(params.defaultValue){
          params.defaultValue = moment(params.defaultValue, format);
        }
        return <RangePicker {...params} onOpenChange = {this.onOpenChange} />

      }else {
        let format = 'YYYY-MM-DD';
        if(params.showTime){
            format = 'YYYY-MM-DD HH:mm:ss';
            params.format = format;
        }
        if(params.defaultValue){
          params.defaultValue = moment(params.defaultValue, format);
        }
        return <DatePickerAnt {...params} />
      }
  }
  onChange(dates, dateStrings){
    console.log(dates);
    console.log(dateStrings);
  }
  render() {
    const { params, type } = this.props;
    let _type = type.toLowerCase();
    let now_cpnt = this.getRenderByType(_type, params);

    return (
      <div className={style.cpntDatepicker}>
        {now_cpnt}
      </div>
    );
  }
}

 /**
   * DatePicker 组件
   * @param {Dom} mountNode
   * https://ant.design/components/date-picker-cn/
   * @param {Object} params see <https://ant.design/components/carousel-cn/>
   *        @param {String} type
   *        @param {Object} config
   */
class DatePicker {
  constructor(mountNode, type, params) {
    let el = document.createElement("div");
    if(mountNode && params && params.onChange){
      let tp = params.onChange;
      //为params添加onChange事件
      params.onChange = (dates , dateStrings) =>{
        console.log(dates);
        console.log(dateStrings);
        let inputs = mountNode.querySelectorAll("input");
        if(Object.prototype.toString.call(dateStrings) === "[object String]"){
          inputs[0] && inputs[0].setAttribute("value", dateStrings);
        }else{
          dateStrings.forEach((v, k) => {
            inputs[k] && inputs[k].setAttribute("value", v);
          });
        }
       //如果用户有自己的onchange那么使用用户的，否则使用我们默认的onChangesh
        tp && tp(dates , dateStrings);
      }
    }
    mountNode.append(el);
    ReactDOM.render (<Cpnt params={params} type={type} mountNode = {mountNode}/>, el);
  }
}

DatePicker.displayName = 'DatePicker';

// export default DatePicker;
window.rc_DatePicker = DatePicker;

