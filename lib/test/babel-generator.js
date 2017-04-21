'use strict';

var _babylon = require('babylon');

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var code = 'class Example {}';
var ast = (0, _babylon.parse)(code);
console.log('ast:', _util2.default.inspect(ast, { showHidden: true, depth: 5 }));
//something like below
/*
ast: Node {
  type: 'File',
  start: 0,
  end: 16,
  loc:
   SourceLocation {
     start: Position { line: 1, column: 0 },
     end: Position { line: 1, column: 16 } },
  program:
   Node {
     type: 'Program',
     start: 0,
     end: 16,
     loc:
      SourceLocation {
        start: Position { line: 1, column: 0 },
        end: Position { line: 1, column: 16 } },
     sourceType: 'script',
     body:
      [ Node {
          type: 'ClassDeclaration',
          start: 0,
          end: 16,
          loc:
           SourceLocation {
             start: Position { line: 1, column: 0 },
             end: Position { line: 1, column: 16 } },
          id:
           Node {
             type: 'Identifier',
             start: 6,
             end: 13,
             loc: SourceLocation { start: [Object], end: [Object], identifierNa
e: 'Example' },
             name: 'Example' },
          superClass: null,
          body:
           Node {
             type: 'ClassBody',
             start: 14,
             end: 16,
             loc: SourceLocation { start: [Object], end: [Object] },
             body: [ [length]: 0 ] } },
        [length]: 1 ],
     directives: [ [length]: 0 ] },
  comments: [ [length]: 0 ],
  tokens:
   [ Token {
       type:
        KeywordTokenType {
          label: 'class',
          keyword: 'class',
          beforeExpr: false,
          startsExpr: false,
          rightAssociative: false,
          isLoop: false,
          isAssign: false,
          prefix: false,
          postfix: false,
          binop: null,
          updateContext: null },
       value: 'class',
       start: 0,
       end: 5,
       loc:
        SourceLocation {
          start: Position { line: 1, column: 0 },
          end: Position { line: 1, column: 5 } } },
     Token {
       type:
        TokenType {
          label: 'name',
          keyword: undefined,
          beforeExpr: false,
          startsExpr: true,
          rightAssociative: false,
          isLoop: false,
          isAssign: false,
          prefix: false,
          postfix: false,
          binop: null,
          updateContext:
           { [Function]
             [length]: 1,
             [name]: '',
             [prototype]: { [constructor]: [Circular] } } },
       value: 'Example',
       start: 6,
       end: 13,
       loc:
        SourceLocation {
          start: Position { line: 1, column: 6 },
          end: Position { line: 1, column: 13 } } },
     Token {
       type:
        TokenType {
          label: '{',
          keyword: undefined,
          beforeExpr: true,
          startsExpr: true,
          rightAssociative: false,
          isLoop: false,
          isAssign: false,
          prefix: false,
          postfix: false,
          binop: null,
          updateContext:
           { [Function]
             [length]: 1,
             [name]: '',
             [prototype]: { [constructor]: [Circular] } } },
       value: undefined,
       start: 14,
       end: 15,
       loc:
        SourceLocation {
          start: Position { line: 1, column: 14 },
          end: Position { line: 1, column: 15 } } },
     Token {
       type:
        TokenType {
          label: '}',
          keyword: undefined,
          beforeExpr: false,
          startsExpr: false,
          rightAssociative: false,
          isLoop: false,
          isAssign: false,
          prefix: false,
          postfix: false,
          binop: null,
          updateContext:
           { [Function]
             [length]: 0,
             [name]: '',
             [prototype]: { [constructor]: [Circular] } } },
       value: undefined,
       start: 15,
       end: 16,
       loc:
        SourceLocation {
          start: Position { line: 1, column: 15 },
          end: Position { line: 1, column: 16 } } },
     Token {
       type:
        TokenType {
          label: 'eof',
          keyword: undefined,
          beforeExpr: false,
          startsExpr: false,
          rightAssociative: false,
          isLoop: false,
          isAssign: false,
          prefix: false,
          postfix: false,
          binop: null,
          updateContext: null },
       value: undefined,
       start: 16,
       end: 16,
       loc:
        SourceLocation {
          start: Position { line: 1, column: 16 },
          end: Position { line: 1, column: 16 } } },
     [length]: 5 ] }
 */
var output = (0, _babelGenerator2.default)(ast, {/* options */}, code);
console.log('output:', output);
//Something like this: { code: 'class Example {}', map: null, rawMappings: null }