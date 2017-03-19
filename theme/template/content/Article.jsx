import React, { PropTypes, Children, cloneElement } from 'react';
//Children method of react
import { FormattedMessage } from 'react-intl';
import DocumentTitle from 'react-document-title';
import { getChildren } from 'jsonml.js/lib/utils';
//getChildren part of jsonml.js
import { Timeline } from 'antd';
import EditButton from './EditButton.jsx';
//EditButton
export default class Article extends React.Component{
static contextTypes = {
    intl: PropTypes.object.isRequired,
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const links = [...document.querySelectorAll('.outside-link.internal')];
    if (links.length === 0) {
      return;
    }
    // eslint-disable-next-line
    const checkImgUrl = 'https://g-assets.daily.taob' + 'ao.net/seajs/seajs/2.2.0/sea.js';
    this.pingTimer = utils.ping(checkImgUrl, (status) => {
      if (status !== 'timeout') {
        links.forEach(link => (link.style.display = 'block'));
      } else {
        links.forEach(link => link.parentNode.removeChild(link));
      }
    });
  }
  componentWillUnmount() {
    clearTimeout(this.pingTimer);
  }

  /**
   * [getArticle description]
   * @param  {[type]} article [description]
   * @return {[type]}         [description]
   */
  // getArticle(article) {
  // 	    console.log('article content:++++',article);
  //   const { content } = this.props;
  //   const { meta } = content;
  //   if (!meta.timeline) {
  //     return article;
  //   }
  //   //if has no meta part of timeline, we just return parameter
  //   const timelineItems = [];
  //   let temp = [];
  //   let i = 1;

  //   Children.forEach(article.props.children, (child) => {
  //     if (child.type === 'h2' && temp.length > 0) {
  //       timelineItems.push(<Timeline.Item key={i}>{temp}</Timeline.Item>);
  //       temp = [];
  //       i += 1;
  //     }
  //     temp.push(child);
  //   });
  //   if (temp.length > 0) {
  //     timelineItems.push(<Timeline.Item key={i}>{temp}</Timeline.Item>);
  //   }
  //   return cloneElement(article, {
  //     children: <Timeline>{timelineItems}</Timeline>,
  //   });
  // }


  render(){

  	const props = this.props;
  	const content = this.props.content;
  	//content is localized pageData which contains meta content and description(slice with hr) part
  	const utils = props.utils;
  	//Get util function from this.props
  	console.log('Article:',props);
    const { meta, description } = content;
    //description extracted by slice of hr element
    const { title, subtitle, filename } = meta;
    //title, subtile,filename is extracted from meta part 
  	return (
		      <DocumentTitle title={`${title} - Ant Design by Liangklfangl`}>
		        <article className="markdown">
		          <h1>
		            {title}
		            {
		              !subtitle || locale === 'en-US' ? null :
		                <span className="subtitle">{subtitle}</span>
		                //If lanugage is Chinese, we also need to show subtile ,for example "anniu"
		            }
		            <EditButton  title={<FormattedMessage id="app.content.edit-page" />} filename={filename} />
		          </h1>
		          {
		            !description ? null :
		              props.utils.toReactComponent(
		                ['section', { className: 'markdown' }].concat(getChildren(description))
		              )
		              //get description part of markdown file
		          }
		          {
		            (!content.toc || content.toc.length <= 1 || meta.toc === false) ? null :
		              <section className="toc">{props.utils.toReactComponent(content.toc)}</section>
		          }
		          {
		            props.utils.toReactComponent(
		              ['section', { className: 'markdown' }].concat(getChildren(content.content))
		            )
		            //content part is content of markdown file 
		          }
		        </article>
		      </DocumentTitle>
  		  )
  }
}