'use strict';
const chain = require('ramda/src/chain');
const toReactComponent = require('jsonml-to-react-component');
//jsonml-to-react-component
const exist = require('exist.js');
const NotFound = require('{{ themePath }}/template/NotFound.jsx');
//replace dynamic param with truely passed param value
function calcPropsPath(dataPath, params) {
  return Object.keys(params).reduce(
    (path, param) => path.replace(`:${param}`, params[param]),
    dataPath
  );
}
//Some dynamic parameter injected
function hasParams(dataPath) {
  return dataPath.split('/').some((snippet) => snippet.startsWith(':'));
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
  const plugins = data.plugins;
  //All 'browser' module
  const converters = chain((plugin) => plugin.converters || [], plugins);
  //converters is for jsonml converter in `browser` mode
  const utils = {
    get: exist.get,
    toReactComponent(jsonml) {
      return toReactComponent(jsonml, converters);
    },
  };
  //utils`s method  toReactComponent is for converting jsonml to react component
  plugins.map((plugin) => plugin.utils || {})
    .forEach((u) => Object.assign(utils, u));
  //plugins`s personal util function is also assiged to final utils object
  //@template is path of component while dataPath is `path` parameter
  function templateWrapper(template, dataPath = '') {
   //template is ususally ./template/NotFound
   const Template = require('{{ themePath }}/template' + template.replace(/^\.\/template/, ''));
   //We get final path of component
    return (nextState, callback) => {
      const propsPath = calcPropsPath(dataPath, nextState.params);
      //replace dynamic parameter of url, such as `path: 'docs/pattern/:children'`
      const pageData = exist.get(data.markdown, propsPath.replace(/^\//, '').replace(/\/$/,"").split('/'));
      //Urls are mapped to component instantiation
      const collect = Template.collect || defaultCollect;
      //We firstly invoke our template`s collect function, passed value are combined with nextState
      //and previous object with data, picked ,pageData,utils contained
      collect(Object.assign({}, nextState, {
        data: data.markdown,
        picked: data.picked,
        pageData,
        //page data is for special html page based on url
        utils,
      }), (err, nextProps) => {
        // const Comp = (hasParams(dataPath) || pageData) && err !== 404 ?
        // Template.default || Template : NotFound.default || NotFound;
        const Comp = (hasParams(dataPath) || pageData) && err !== 404 ?
        Template.default || Template : NotFound.default || NotFound;
        //ES6 based component, we need to import .default while module.exports do not need to
        const dynamicPropsKey = nextState.location.pathname;
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
  const theme = require('{{ themePath }}');
  // We get index file from themePath which is configured as core part of react-router
  const routes = Array.isArray(theme.routes) ? theme.routes : [theme.routes];
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
    return Object.assign({}, route, {
      onEnter: () => {
        if (typeof document !== 'undefined') {
        }
      },
      component: undefined,
      //Same as component but asynchronous, useful for code-splitting.
      //https://github.com/liangklfang/react-router/blob/master/docs/API.md#getcomponentsnextstate-callback
      //http://www.mtons.com/content/61.htm
      getComponent: templateWrapper(route.component, route.dataPath || route.path),
      //Get component file path and 'path' for url
      indexRoute: route.indexRoute && Object.assign({}, route.indexRoute, {
        component: undefined,
        getComponent: templateWrapper(
          route.indexRoute.component,
          route.indexRoute.dataPath || route.indexRoute.path
        ),
      }),
      childRoutes: route.childRoutes && route.childRoutes.map(processRoutes),
    });
  }
  const processedRoutes = processRoutes(routes);
  //Here , We process Routes configuration
  processedRoutes.push({
    path: '*',
    getComponents: templateWrapper('/NotFound.jsx'),
  });
 //Here is default router!
  return processedRoutes;
};
