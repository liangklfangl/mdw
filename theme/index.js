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
      if(/\/demo$/.test(path.dirname(filename)))return;
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
   "./lib/plugins/dora-plugin-preview?lang=__react",
   "./lib/plugins/dora-plugin-antd"
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
       {
       path: 'docs/spec/:children',
       component: contentTmpl,
      },
       {
       path: 'docs/resource/:children',
       component: contentTmpl,
      },
      {
       path: 'docs/pattern/:children',
       component: contentTmpl,
      },
        {
        path: 'components/:children/',
        component: contentTmpl,
      }
      //此时只有path最后含有"/"才会实例化这个组件，比如"components/alert/"
      //而"components/alert"不会实例化
    ]

  }
};
