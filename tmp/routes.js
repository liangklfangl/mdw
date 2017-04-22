'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chain = require('ramda/src/chain');
var _toReactComponent = require('jsonml-to-react-component');
//jsonml-to-react-component
var exist = require('exist.js');
var NotFound = require('C:/Users/Administrator/Desktop/mdw/theme/template/NotFound.jsx');
//replace dynamic param with truely passed param value
function calcPropsPath(dataPath, params) {
  return (0, _keys2.default)(params).reduce(function (path, param) {
    return path.replace(':' + param, params[param]);
  }, dataPath);
}
//Some dynamic parameter injected
function hasParams(dataPath) {
  return dataPath.split('/').some(function (snippet) {
    return snippet.startsWith(':');
  });
}
//Do nothing
function defaultCollect(nextProps, callback) {
  callback(null, nextProps);
}
/*
	We receive something like this:
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
module.exports = function getRoutes(data) {
  var plugins = data.plugins;
  //All 'browser' module
  var converters = chain(function (plugin) {
    return plugin.converters || [];
  }, plugins);
  //converters is for jsonml converter in `browser` mode
  var utils = {
    get: exist.get,
    toReactComponent: function toReactComponent(jsonml) {
      return _toReactComponent(jsonml, converters);
    }
  };
  //utils`s method  toReactComponent is for converting jsonml to react component
  plugins.map(function (plugin) {
    return plugin.utils || {};
  }).forEach(function (u) {
    return (0, _assign2.default)(utils, u);
  });
  //plugins`s personal util function is also assiged to final utils object
  //@template is path of component while dataPath is `path` parameter
  function templateWrapper(template) {
    var dataPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    //template is ususally ./template/NotFound
    var Template = require('C:/Users/Administrator/Desktop/mdw/theme/template' + template.replace(/^\.\/template/, ''));
    //We get final path of component
    return function (nextState, callback) {
      var propsPath = calcPropsPath(dataPath, nextState.params);
      //replace dynamic parameter of url, such as `path: 'docs/pattern/:children'`
      var pageData = exist.get(data.markdown, propsPath.replace(/^\//, '').replace(/\/$/, "").split('/'));
      //Urls are mapped to component instantiation
      var collect = Template.collect || defaultCollect;
      //We firstly invoke our template`s collect function, passed value are combined with nextState
      //and previous object with data, picked ,pageData,utils contained
      collect((0, _assign2.default)({}, nextState, {
        data: data.markdown,
        picked: data.picked,
        pageData: pageData,
        //page data is for special html page based on url
        utils: utils
      }), function (err, nextProps) {
        // const Comp = (hasParams(dataPath) || pageData) && err !== 404 ?
        // Template.default || Template : NotFound.default || NotFound;
        var Comp = (hasParams(dataPath) || pageData) && err !== 404 ? Template.default || Template : NotFound.default || NotFound;
        //ES6 based component, we need to import .default while module.exports do not need to
        var dynamicPropsKey = nextState.location.pathname;
        //we get pathname
        Comp[dynamicPropsKey] = nextProps;
        //In create-element.js, we do that. <Component {...props} {...Component[dynamicPropsKey]} />
        //something as bellow
        /*
         <ReactRouter.Router
        history={ReactRouter.useRouterHistory(history.createHistory)({ basename })}
        routes={routes}
        createElement={createElement}//that is createElement Function
        />;
        module.exports = function createElement(Component, props) {
        const dynamicPropsKey = props.location.pathname;
        return <Component {...props} {...Component[dynamicPropsKey]} />;
        };
         */
        callback(err === 404 ? null : err, Comp);
        //https://react-guide.github.io/react-router-cn/docs/guides/advanced/DynamicRouting.html
        //callback of react-router natively
      });
    };
  }
  var theme = require('C:/Users/Administrator/Desktop/mdw/theme');
  // We get index file from themePath which is configured as core part of react-router
  var routes = Array.isArray(theme.routes) ? theme.routes : [theme.routes];
  //Get router part of react-router, routes part ususally configured as follows:
  /*
   routes: {
   path: '/',
   component: './template/Layout/index',
   indexRoute: { component: homeTmpl },
   childRoutes: [{
     path: 'index-cn',
     component: homeTmpl,
   }],
  */
  function processRoutes(route) {
    if (Array.isArray(route)) {
      //map is used to manipulate some object
      return route.map(processRoutes);
    }
    return (0, _assign2.default)({}, route, {
      onEnter: function onEnter() {
        if (typeof document !== 'undefined') {}
      },
      component: undefined,
      //Same as component but asynchronous, useful for code-splitting.
      //https://github.com/liangklfang/react-router/blob/master/docs/API.md#getcomponentsnextstate-callback
      //http://www.mtons.com/content/61.htm
      getComponent: templateWrapper(route.component, route.dataPath || route.path),
      //Get component file path and 'path' for url
      indexRoute: route.indexRoute && (0, _assign2.default)({}, route.indexRoute, {
        component: undefined,
        getComponent: templateWrapper(route.indexRoute.component, route.indexRoute.dataPath || route.indexRoute.path)
      }),
      childRoutes: route.childRoutes && route.childRoutes.map(processRoutes)
    });
  }
  var processedRoutes = processRoutes(routes);
  //Here , We process Routes configuration
  processedRoutes.push({
    path: '*',
    getComponents: templateWrapper('/NotFound.jsx')
  });
  //Here is default router!
  return processedRoutes;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(calcPropsPath, 'calcPropsPath', 'src/routes.nunjucks.js');

  __REACT_HOT_LOADER__.register(hasParams, 'hasParams', 'src/routes.nunjucks.js');

  __REACT_HOT_LOADER__.register(defaultCollect, 'defaultCollect', 'src/routes.nunjucks.js');
}();

;