import {parse} from 'babylon';
import generate from 'babel-generator';

const code = 'class Example {}';
const ast = parse(code);

const output = generate(ast, { /* options */ }, code);