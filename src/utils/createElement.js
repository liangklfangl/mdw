
const React = require('react');
module.exports = function createElement(Component, props) {
  const dynamicPropsKey = props.location.pathname;
  return <Component {...props} {...Component[dynamicPropsKey]} />;
};
