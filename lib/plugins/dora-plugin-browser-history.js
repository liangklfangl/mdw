'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  'middleware': function middleware() {
    var query = this.query;
    var middleware = require('connect-history-api-fallback')({
      index: query.index || '/index.html',
      rewrites: query.rewrites
    });

    var noop = function noop() {};

    return _regenerator2.default.mark(function _callee(next) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              middleware(this, null, noop);
              _context.next = 3;
              return next;

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    });
  }
};