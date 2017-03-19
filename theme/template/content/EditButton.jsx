import React from 'react';
import { Tooltip, Icon } from 'antd';
import styles from "../../static/layout-index.less";
const branchUrl = 'https://github.com/ant-design/ant-design/blob/master/';
//<EditButton title={<FormattedMessage id="app.content.edit-page" />} filename={filename} />
//Title is for ToolTip component while filename is a url 
export default function EditButton({ title, filename }) {
  return (
    <Tooltip title={title}>
      <a className="edit-button" className={styles.editButton} href={`${branchUrl}${filename}`}>
        <Icon type="edit" />
      </a>
      {/*content in Tooltip components is for showing, when mouse enter , the title attr of Tooltip will show*/}
    </Tooltip>
  );
}
