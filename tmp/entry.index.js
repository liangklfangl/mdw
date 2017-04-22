'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createElement = require('../lib/utils/createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactRouter = require('react-router');
var history = require('history');
var data = require('../lib/utils/data.js');
console.log('准备写data.js', data);

/*
  var Promise = require('bluebird');
  module.exports = {
    markdown: {
    'posts\demo2': require('C:/Users/Administrator/Desktop/mdw/posts/demo2.md'),
    'posts\demos\demo1': require('C:/Users/Administrator/Desktop/mdw/posts/demos/demo1.md'),
  },
    plugins: [
  ],
    picked: {},
  };
 */
//As entry file, we have to know routes meaning which component to instantiate(ReactRouter)!
var routes = require('C:/Users/Administrator/Desktop/mdw/tmp/routes.js')(data);
//Purpose 1: We pass our markdown object to react-router to figure out which component to instantiate!
//Purpose 2: In this module, we get all plugins`s converter array combined to translate jsonml to react component
//Purpose 3: Every Component , child component included, has it`s own util and also support code splitting
//Finally: We get processed Object for react-router
var _window$location = window.location,
    pathname = _window$location.pathname,
    search = _window$location.search,
    hash = _window$location.hash;

var location = '' + pathname + search + hash;
var basename = '/';

//This function is to be used for server-side rendering. It matches a set of routes to a location,
//without rendering, and calls a callback(error, redirectLocation, renderProps) when it's done.
ReactRouter.match({ routes: routes, location: location, basename: basename }, function () {
  var router = _react2.default.createElement(ReactRouter.Router, {
    history: ReactRouter.useRouterHistory(history.createHistory)({ basename: basename })
    //The history the router should listen to. Typically browserHistory or hashHistory.
    , routes: routes
    //alias of children
    , createElement: _createElement2.default
    //When the router is ready to render a branch of route components, it will use this function to create the elements.
  });
  _reactDom2.default.render(router, document.getElementById('react-content'));
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(routes, 'routes', 'src/entry.nunjucks.js');

  __REACT_HOT_LOADER__.register(pathname, 'pathname', 'src/entry.nunjucks.js');

  __REACT_HOT_LOADER__.register(search, 'search', 'src/entry.nunjucks.js');

  __REACT_HOT_LOADER__.register(hash, 'hash', 'src/entry.nunjucks.js');

  __REACT_HOT_LOADER__.register(location, 'location', 'src/entry.nunjucks.js');

  __REACT_HOT_LOADER__.register(basename, 'basename', 'src/entry.nunjucks.js');
}();

;