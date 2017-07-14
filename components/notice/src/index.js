'use strict';

import React from 'react';
import { Carousel } from 'antd';

import style from './index.less';

export default class Cpnt extends React.Component {
  render() {
    const {params, data} = this.props;
    return (
      <div className={style.noticeComponent}>
        <Carousel {...params}>
        {
          data.map((item, index) => {
            return <div key={index}>{item}</div>
          })
        }
        </Carousel>
      </div>
    );
  }
}

class Notice {
  /**
   * Notice 组件
   * @param {Dom} mountNode
   * @param {Array} data
   * @param {Object} params see <https://ant.design/components/carousel-cn/>
   */
  constructor(mountNode, data, params) {
    ReactDOM.render (<Cpnt params={params} data={data} />, mountNode);
  }
}

Notice.displayName = 'Notice';

window.rc_Notice = Notice;

