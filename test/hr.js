const MT = require('mark-twain');
const fs = require('fs');
const jsonML = MT(fs.readFileSync('./hr.md').toString());
console.log('jsonML----',jsonML);
