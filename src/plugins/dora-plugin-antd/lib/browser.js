import React from 'react';
import { Link } from 'react-router';
import toReactElement from 'jsonml-to-react-element';
import JsonML from 'jsonml.js/lib/utils';

function isHeading(node) {
  return /h[1-6]/i.test(JsonML.getTagName(node));
}

function isZhCN(pathname) {
  return /-cn\/?$/.test(pathname);
}

function makeSureComonentsLink(pathname) {
  const pathSnippets = pathname.split('#');
  if (pathSnippets[0].indexOf('/components') > -1 && !pathSnippets[0].endsWith('/')) {
    pathSnippets[0] = `${pathSnippets[0]}/`;
  }
  return pathSnippets.join('#');
}

function toZhCNPathname(pathname) {
  const pathSnippets = pathname.split('#');
  pathSnippets[0] = `${pathSnippets[0].replace(/\/$/, '')}-cn`;
  return makeSureComonentsLink(pathSnippets.join('#'));
}

/**
 * [generateSluggedId Generate id]
 * @param  {[type]} children [description]
 * @return {[type]}          [description]
 */
function generateSluggedId(children) {
  const headingText = children.map((node) => {
    if (JsonML.isElement(node)) {
      if (JsonML.hasAttributes(node)) {
        return node[2] || '';
      }
      return node[1] || '';
    }
    return node;
  }).join('');
  const sluggedId = headingText.trim().replace(/\s+/g, '-');
  //"When to use" will be changed to "When-to-use"
  return sluggedId;
}

// export default doesn't work
module.exports = (_, props) =>
   ({
     converters: [
       [node => JsonML.isElement(node) && isHeading(node), (node, index) => {
         const children = JsonML.getChildren(node);
         const sluggedId = generateSluggedId(children);
         //生成ID
         return React.createElement(JsonML.getTagName(node), {
           key: index,
           id: sluggedId,
           ...JsonML.getAttributes(node),
         }, [
           <span key="title">{children.map(child => toReactElement(child))}</span>,
           <a href={`#${sluggedId}`} className="anchor" key="anchor">#</a>,
         ]);
         //childElement
       }],
       [node => JsonML.isElement(node) && JsonML.getTagName(node) === 'a' && !(
        //如果是a标签，我们转化为link
        JsonML.getAttributes(node).class ||
          (JsonML.getAttributes(node).href &&
           JsonML.getAttributes(node).href.indexOf('http') === 0) ||
          /^#/.test(JsonML.getAttributes(node).href)
       ), (node, index) => {
         const href = JsonML.getAttributes(node).href;
         return (
           <Link
             to={isZhCN(props.location.pathname) ? toZhCNPathname(href) : makeSureComonentsLink(href)}
             key={index}
           >
             {toReactElement(JsonML.getChildren(node)[0])}
           </Link>
         );
       }]
     ],
   })
;