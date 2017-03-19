import React , {PropTypes} from "react";
import { Select, Menu, Row, Col, Icon, Button, Popover } from 'antd';
import * as utils from '../utils.jsx';
import { Link } from 'react-router';
import classNames from 'classnames';
require("../../static/layout-index");
import { FormattedMessage } from 'react-intl';
const Option = Select.Option;
if (typeof window !== 'undefined') {
  /* eslint-disable global-require */
  // Expose to iframe
  window.react = React;
  require('../../static/style.js');
  window.antd = require('antd');
  /* eslint-enable global-require */
}

export default class Header extends React.Component{
	constructor(props){
	  super(props);
	  this.state={
      menuMode:'horizontal'
     };
	}
   //To announce contextTypes to get intl from LocaleProvider
   static contextTypes = {
   	 intl : PropTypes.object.isRequired
   }
	render(){
	 const {location, picked, isFirstScreen} = this.props;
	 const components = picked.components;
	 //picked is generate by pick function, with components/demos folder omitted
     const locale = this.context.intl.locale;
     //Get locale
     const isZhCN = locale ==='zh-CN'
     //Whether in chinese version
     const excludedSuffix = isZhCN ? "en-US.md" : "zh-CN.md";
     //in Chinese version , we eliminate English Version
     const module = location.pathname.replace(/(^\/|\/$)/g, '').split('/').slice(0, -1).join('/');
     let activeMenuItem = module || 'home';
     //We get first part of URL , components? or changelog ?
    if (activeMenuItem === 'components' || location.pathname === 'changelog') {
      activeMenuItem = 'docs/react';
    }
     const headerClassName = classNames({
       clearfix: true,
      'home-nav-white': !isFirstScreen,
       //In other screen , we add 'home-nav-white' class
    });
     const options = components
      .filter(({ meta }) => !meta.filename.endsWith(excludedSuffix))
      .map(({ meta }) => {
        const pathSnippet = meta.filename.split('/')[1];
        const url = `/components/${pathSnippet}`;
        //True component part, with this url , we can turn to react-router for help for components instantiation
        const subtitle = meta.subtitle;
        //Such as Chinese version "按钮" of title of "Button"
        return (
          <Option value={url} key={url} data-label={`${meta.title.toLowerCase()} ${subtitle || ''}`}>
            <strong>{meta.title}</strong>
            {subtitle && <span className="ant-component-decs">{subtitle}</span>}
          </Option>
        );
      });
     const menuMode = this.state.menuMode;
      //Next is Menu part
     const menu = [
      
      <Menu mode={menuMode} selectedKeys={[activeMenuItem]} id="nav" key="nav">
        <Menu.Item key="home">
          <Link to={utils.getLocalizedPathname('/', isZhCN)}>
            <FormattedMessage id="app.header.menu.home" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/spec">
          <Link to={utils.getLocalizedPathname('/docs/spec/introduce', isZhCN)}>
            <FormattedMessage id="app.header.menu.spec" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/react">
          <Link to={utils.getLocalizedPathname('/docs/react/introduce', isZhCN)}>
            <FormattedMessage id="app.header.menu.components" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/pattern">
          <Link to={utils.getLocalizedPathname('/docs/pattern/navigation', isZhCN)}>
            <FormattedMessage id="app.header.menu.pattern" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/practice">
          <Link to={utils.getLocalizedPathname('/docs/practice/cases', isZhCN)}>
            <FormattedMessage id="app.header.menu.practice" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/resource">
          <Link to={utils.getLocalizedPathname('/docs/resource/download', isZhCN)}>
            <FormattedMessage id="app.header.menu.resource" />
          </Link>
        </Menu.Item>
      </Menu>,
    ];
  const searchPlaceholder = locale === 'zh-CN' ? '搜索组件...' : 'Search Components...';
  return (
	  <header  className="header1">
        <Row>
          <Col lg={20} md={18} sm={0} xs={0} style={{ display: 'block' }}>
            {menuMode === 'horizontal' ? menu : null}
          </Col>
        </Row>
      </header>
	 )
	}
}