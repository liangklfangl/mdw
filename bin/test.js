const MT = require('mark-twain');
const fs = require('fs');
const jsonML = MT(fs.readFileSync('test.md').toString());
const util = require('util');
console.log(util.inspect(jsonML,{showHidden:true,depth:4}));