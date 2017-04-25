import React from  'react';
import ReactDOM from 'react-dom';
const ReactRouter = require('react-router') ;
const history = require('history');
let data  = require('../lib/utils/data.js');
console.log('所有markdown树和内容都解析后:',data);

import createElement from "../lib/utils/createElement";
import Router from "react-router";
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
const routes = require('{{routesPath}}')(data);
//Purpose 1: We pass our markdown object to react-router to figure out which component to instantiate!
//Purpose 2: In this module, we get all plugins`s converter array combined to translate jsonml to react component
//Purpose 3: Every Component , child component included, has it`s own util and also support code splitting
//Finally: We get processed Object for react-router
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;
const basename = '{{ root }}';

//This function is to be used for server-side rendering. It matches a set of routes to a location,
//without rendering, and calls a callback(error, redirectLocation, renderProps) when it's done.
ReactRouter.match({ routes, location, basename }, () => {
  const router =
    <ReactRouter.Router
      history={ReactRouter.useRouterHistory(history.createHistory)({ basename })}
      //The history the router should listen to. Typically browserHistory or hashHistory.
      routes={routes}
      //alias of children
      createElement={createElement}
      //When the router is ready to render a branch of route components, it will use this function to create the elements.
    />;
  ReactDOM.render(
    router,
    document.getElementById('react-content')
  );
});
