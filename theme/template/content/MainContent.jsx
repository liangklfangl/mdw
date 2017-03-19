import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Row, Col, Menu } from 'antd';
import * as utils from "../utils";
import config from "../index.jsx";
const SubMenu = Menu.SubMenu;
import styles from "../../static/layout-index.less";
import Article from './Article';
import ComponentDoc from './ComponentDoc';
/**
	 * [isNotTopLevel description]
	 * @param  {[type]}  level [description]
	 * @return {Boolean}       [description]
	 */
	 function isNotTopLevel(level) {
	  return level.toLowerCase() !== 'toplevel';
	}
/**
 * We get all data from markdown data tree
 */
export default class MainContent extends React.Component {
   
    static contextType = {
    	intl :PropTypes.object.isRequired,
    }
	constructor(props){
		super(props);
	}
	/**
	 * [getActiveMenuItem We just get :children part of path configured in react-router]
	 * @param  {[type]} props [description]
	 * @return {[type]}       [description]
	 */
	 getActiveMenuItem(props) {
	  const children = props.params.children;
	  //children is from path configured from react-router
	  return (children && children.replace('-cn', '')) ||
	    props.location.pathname.replace(/(^\/|-cn$)/g, '');
	}
	
	/**
	 * [fileNameToPath We get 'index' part from "index.en-US.md"]
	 * @param  {[type]} filename [description]
	 * @return {[type]}          [description]
	 */
	 fileNameToPath(filename) {
	  const snippets = filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').split('/');
	  return snippets[snippets.length - 1];
	}

	/**
	 * [getModuleData description]
	 * @param  {[type]} props [description]
	 * @return {[type]}       [description]
	 */
	getModuleData(props){
      const pathname = props.location.pathname;
      //We get pathname from this.props
      const moduleName = /^\/?components/.test(pathname) ?
          'components' : pathname.split('/').filter(item => item).slice(0, 2).join('/');
      //We get moduleName, if url is https://ant.design/docs/react/introduce-cn , we will get "docs/react"
      const moduleData = moduleName === 'components' || moduleName === 'docs/react' ||
      moduleName === 'changelog' || moduleName === 'changelog-cn' ?
      [...props.picked.components, ...props.picked['docs/react'], ...props.picked.changelog] :
      props.picked[moduleName];
     //if moduleName is "component", we will get components or docs/react or changelog of this.props
     const excludedSuffix = utils.isZhCN(props.location.pathname) ? 'en-US.md' : 'zh-CN.md';
     return moduleData.filter(({ meta }) => !meta.filename.endsWith(excludedSuffix));
     //We exclude markdown file with suffix
	}

    /**
     * [getMenuItems We get menu items by moduleData]
     * @return {[type]} [Something like this]
     * <Menu.MenuItem></Menu.MenuItem>, <Menu.SubMenu><Menu.ItemGroup><Menu.MenuItem></Menu.MenuItem></Menu.ItemGroup></Menu.SubMenu>
     */
    getMenuItems(){
        const moduleData = this.getModuleData(this.props);
        //We get module data here
	    const menuItems = utils.getMenuItems(
	      moduleData, "hello world"
	    );
	    //meuItems like this , menuItems[category][type] = [];
	    //{'topLevel':{topLevel:[],***:[]},Components:{Navigation:[],General:[]}}, you can see here only
	    //contains topLevel and Components two keys
	    const topLevel = this.generateSubMenuItems(menuItems.topLevel);
	    //If category is 'topLevel', we generate Menu.Item while others will generate Menu.ItemGroup
	    const subMenu = Object.keys(menuItems).filter(isNotTopLevel)
	      //.sort((a, b) => config.categoryOrder[a] - config.categoryOrder[b])
	      //We sort by categoryOrder here while below sorted by typeOrder 
	      .map((category,i) => {
	        const subMenuItems = this.generateSubMenuItems(menuItems[category]);
	        //Menu.ItemGroup
	        return (
	          <SubMenu title={<h4>{category}</h4>} key={category+i}>
	            {subMenuItems}
	          </SubMenu>
	        );
	      });
	    return [...topLevel, ...subMenu];
	    //[Menu.Item,Menu.Item,Menu.ItemGroup,Menu.ItemGroup] is for toplevel
	    //[<SubMenu><Menu.ItemGroup></Menu.ItemGroup></SubMenu>] is for other Group
    }

/**
 * [generateSubMenuItems : Receiving one parameter, we will generate Menu.Item with `topLevel` category while Menu.ItemGroup with other category]
 * @param  {[type]} obj [description]
 * @return {[type]}     [<Menu.Item></Menu.Item>,<Menu.ItemGroup><Menu.Item></Menu.Item></Menu.ItemGroup>]
 *{topLevel:[],***:[]} is passed in here, toplevel we will get Menu.Item while other will get Menu.ItemGroup
 * Each item of top level will be displayed separately, so we will not sort this!
 */
   generateSubMenuItems(obj) {
    const topLevel = (obj.topLevel || []).map(this.generateMenuItem.bind(this, true));
    //Get second-order toplevel item(not ItemGroup), and second-order ItemGroup items
    const itemGroups = Object.keys(obj).filter(isNotTopLevel) 
      .sort((a, b) => config.typeOrder[a] - config.typeOrder[b])
      //{'Data Display':[],'Data Entry':[],Feedback:[],General:[],Layout:[],Navigation:[],Other:[]}， which should be first
      //This key is second-order category
      .map((type, index) => {
        const groupItems = obj[type].sort((a, b) => {
          return a.title.charCodeAt(0) -
          b.title.charCodeAt(0);
          //We sort third-order category by title , here type is second-order category
        }).map(this.generateMenuItem.bind(this, false));
        return (
          <Menu.ItemGroup title={type} key={index}>
            {groupItems}
            {/*Here we return ItemGroup object*/}
          </Menu.ItemGroup>
        );
      });
    //Here itemGroups will generate if you do not define category and type in markdown files!
    return [...topLevel, ...itemGroups];
  }
   /**
	 * [generateMenuItem Generate MenuItem]
	 * @param  {Boolean} isTop [description]
	 * @param  {[type]}  item  [description]
	 * @return {[type]}        [description]
	 */
	  generateMenuItem(isTop, item) {
	    const locale = this.context['hello world'];
	    const key = this.fileNameToPath(item.filename);
	    //We get "index" part from "index.en-US.md"
	    const text = isTop ?
	            item.title[locale] || item.title : [
	              <span key="english">{item.title}</span>,
	              <span className="chinese" key="chinese">{item.subtitle}</span>,
	            ];
	     //We get title part of top menu
	    const disabled = item.disabled;
	    const url = item.filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').toLowerCase();
	    //We get 'index' part 'index.en-US.md'. Here throgh url, we will trigger react-router 
	    const child = !item.link ? (
	      <Link
	        to={utils.getLocalizedPathname(/^components/.test(url) ? `${url}/` : url, locale === 'zh-CN')}
	        disabled={disabled}
	      >
	        {text}
	      </Link>
	    ) : (
	      <a href={item.link} target="_blank" rel="noopener noreferrer" disabled={disabled}>
	        {text}
	      </a>
	    );
	    return (
	      <Menu.Item key={key.toLowerCase()} disabled={disabled}>
	        {child}
	      </Menu.Item>
	    );
	  }

	render(){
	 const props = this.props;
	  //Get data from this.props
	  const activeMenuItem = this.getActiveMenuItem(props);
      const menuItems = this.getMenuItems();
      //We get menuItems from data object
      const localizedPageData = props.pageData;
		return (
		<div className="mainWrapper">
        <Row>
          <Col>
            <Menu  mode="inline">
              {menuItems}
            </Menu>
          </Col>
          <Col lg={20} md={18} sm={24} xs={24} className="mainContainer">
            {
              //If props with no demo object meaning that this is only introduce markdown file
              props.demos ?
                <ComponentDoc {...props} doc={localizedPageData} demos={props.demos} /> :
                <Article {...props} content={localizedPageData} />
            }
          </Col>
        </Row>
      </div>

		)
	}
}
