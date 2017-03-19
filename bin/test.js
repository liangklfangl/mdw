var exist = require('exist.js');
var obj ={name:'qinliang',sex:'male'};
const pageData = exist.get(obj, [""]);
console.log('pageData:',pageData);

    