const babylon = require('babylon');
const generator = require('babel-generator');

const code = 'class Example {}';
const ast = babylon.parse(code);

const output = generator.generate(ast, { /* options */ }, code);
console.log('output:',output);