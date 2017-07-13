import Select from "../src/select.js";
const inputs = document.querySelectorAll('.input');
    inputs.forEach(function(elem,index){
       new Select(elem,
           {
            url:"http://mytv-test.alibaba.net/common/jsonp/getYoukuPerson.htm",
            style:{
              width:"200px",
              // marginLeft:"50px",
              // marginTop:'200px',
              // backgroundColor:"red",
              // border:'1px solid red'
            },
            method:'post',
            query:{
              fetchKey:"keyword"
            },
            data:["data",'users'],
            //对象路由
            updater:function(item){
             return item.personname;
            },
            //该函数表示选中一行的时候应该选中哪一个字段在文本框中显示
            showHtml:function(rowData){
                const thumburl = rowData.thumburl;
                const personname = rowData.personname;
                const personid = rowData.personid;
                return "<img style='vertical-align:middle' src="+thumburl+"></img>"+"<span>"+personid+"</span>"+"<span style='width:80px;'>"+personname+"</span>"
              }

       });
});
