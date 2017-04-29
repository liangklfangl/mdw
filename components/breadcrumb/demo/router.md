---
order: 2
iframe: true
title:
  zh-CN: 路由
  en-US: React Router Integration
---

## zh-CN

和 `react-router@2+` 进行结合使用。

## en-US

Used together with `react-router@2+`.

````jsx
import { Router, Route, Link, hashHistory } from 'react-router';
import { Breadcrumb, Alert } from 'antd';

const Apps = () => (
  <ul className="app-list">
    <li>
      <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
    </li>
    <li>
      <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail">Detail</Link>
    </li>
  </ul>
);

const Home = ({ routes, params, children }) => (
  <div>
    <div className="demo-nav">
      <Link to="/">Home</Link>
      <Link to="/apps">Application List</Link>
    </div>
    {children || 'Home Page'}
    <Alert style={{ margin: '16px 0' }} message="Click the navigation above to switch:" />
    <Breadcrumb routes={routes} params={params} />
  </div>
);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route name="home" breadcrumbName="Home" path="/" component={Home}>
      <Route name="apps" breadcrumbName="Application List" path="apps" component={Apps}>
        <Route name="app" breadcrumbName="Application:id" path=":id">
          <Route name="detail" breadcrumbName="Detail" path="detail" />
        </Route>
      </Route>
    </Route>
  </Router>
, mountNode);
````

````css
#components-breadcrumb-demo-router iframe {
  height: 180px;
}
.demo-nav {
  height: 30px;
  line-height: 30px;
  margin-bottom: 15px;
  background: #f8f8f8;
}
.demo-nav a {
    line-height: 30px;
    padding: 0 8px;
}
a {
    -webkit-transition: color .3s ease;
    transition: color .3s ease;
}
a {
    color: #108ee9;
    background: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    -webkit-transition: color .3s ease;
    transition: color .3s ease;
}
.ant-alert.ant-alert-no-icon {
    padding: 8px 48px 8px 16px;
}
.ant-alert-info {
    border: 1px solid #d2eafb;
    background-color: #ecf6fd;
}
.ant-alert {
    position: relative;
    padding: 8px 48px 8px 38px;
    border-radius: 4px;
    color: rgba(0,0,0,.65);
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 10px;
}
.ant-alert-description {
    font-size: 12px;
    line-height: 21px;
    display: none;
}
a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
}
````
