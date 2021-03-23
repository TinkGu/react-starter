import React, { memo } from 'react';
import classNames from 'classnames/bind';
import { goBack } from 'utils/url-utils';
import styles from './styles.scss';

const cx = classNames.bind(styles);

function PageExample() {
  return (
    <div className={cx('page-example')}>
      这是示例页面
      <div onClick={goBack} className={cx('link')}>返回上一页</div>
    </div>
  );
}

export default memo(PageExample);
