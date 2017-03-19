const path = require('path');
const contentTmpl = './template/content/index.jsx';
const layoutTemp = './template/Layout/index.jsx';
const homeTmpl = './template/home/index.jsx';

function pickerGenerator(module) {
  const tester = new RegExp(`^docs/${module}`);
  return (markdownData) => {
    const filename = markdownData.meta.filename;
    if (tester.test(filename) &&
        !/\/demo$/.test(path.dirname(filename))) {
      return {
        meta: markdownData.meta,
      };
    }
  };
}
module.exports = {
  lazyLoad(nodePath, nodeValue) {
  },
  //We add loaders for special files
  webpackConfig(webpackConfig,webpack){
    return webpackConfig;
  },
  pick: {
   components(markdownData) {
      const filename = markdownData.meta.filename;
      if(!/^components/.test(filename))return;
      //if request.url not begin width components , we do not care about it!
      if(/\/demos$/.test(path.dirname(filename)))return;
      //We do not care about componets/demos markdown files
      return {
        meta: markdownData.meta,
      };
    },
     changelog(markdownData) {
      if (/changelog/.test(markdownData.meta.filename)) {
        return {
          meta: markdownData.meta,
        };
      }
    },
    'docs/pattern': pickerGenerator('pattern'),
    'docs/practice': pickerGenerator('practice'),
    'docs/react': pickerGenerator('react'),
    'docs/resource': pickerGenerator('resource'),
    'docs/spec': pickerGenerator('spec'),
  },
  plugins: [
    "./lib/plugins/dora-plugin-description",
  //To devide jsonml to content and description two part, the path relative to process.cwd!
   "./lib/plugins/dora-plugin-preview?lang=__react"
  ],
  routes: {
  	path:'/',
  	component:layoutTemp,
    indexRoute: { component: homeTmpl },
    //when initialize layoutTemp, we will also initialize homeTemp
    childRoutes: [
    {
      path: 'index-cn',
      component: homeTmpl,
      dataPath: '/',
    },
    //if you visit '/index-cn', we also initialize homeTempl
      // { 
      //   path: 'components/:children/', 
      //   //So, 'components/Button/demos/basic' will not work, we just care about 'components/Button/'
      //   component: contentTmpl
      // },
       {
       path: 'docs/react/:children',
       component: contentTmpl,
      },
      //If we click 'component' panel, we will initialize contentTmpl
        {
        path: 'components/:children/',
        component: contentTmpl,
      }
      //If you click 'component' panel, content part of layoutTemp will be replaced by contentTmpl!
      //this time collect function will be revoked and left part and right part of content will be recalculated
      //while header and footer part stand still
    ]
    //path relative to cwd/theme/template
    //Every component instantiated will receive a util object to translate jsonml to react Component
  }
};